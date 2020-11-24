const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { SkynetClient } = require(`skynet-js`)
const client = new SkynetClient("https://siasky.net")

async function getJSONPost(client, publicKey, dataKey) {
    try {
      const { data, revision } = await client.db.getJSON(publicKey, dataKey)
      return { data: data, revision: revision }
    } catch (error) {
      console.log(error)
    }
}

/**
 * ============================================================================
 * Helper functions and constants
 * ============================================================================
 */

const POST_NODE_TYPE = `Post`
//const AUTHOR_NODE_TYPE = `Author`

// helper function for creating nodes
const createNodeFromData = (item, nodeType, helpers) => {
  const nodeMetadata = {
    id: helpers.createNodeId(`${nodeType}-${item.id}`),
    parent: null, // this is used if nodes are derived from other nodes, a little different than a foreign key relationship, more fitting for a transformer plugin that is changing the node
    children: [],
    internal: {
      type: nodeType,
      content: JSON.stringify(item),
      contentDigest: helpers.createContentDigest(item),
    },
  }

  const node = Object.assign({}, item, nodeMetadata)
  helpers.createNode(node)
  return node
}

/**
 * ============================================================================
 * Verify plugin loads
 * ============================================================================
 */

// should see message in console when running `gatsby develop` in example-site
exports.onPreInit = () => console.log("Loaded gatsby-source-skydb")

/**
 * ============================================================================
 * Link nodes together with a customized GraphQL Schema
 * ============================================================================
 */

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Post implements Node {
      id: ID!
      code: String!
      time: Date!
      type: String!
      likes: Int
      comment: Int
      text: String!
      media: String!
      # create relationships between Post and File nodes for optimized images
      image: File @link
      username: String
      avatar: String
    }`)
}

/**
 * ============================================================================
 * Source and cache nodes from the API
 * ============================================================================
 */

exports.sourceNodes = async function sourceNodes(
  {
    actions,
    cache,
    createContentDigest,
    createNodeId,
    getNodesByType,
    getNode,
  },
  pluginOptions
) {
  const { createNode, touchNode, deleteNode } = actions
  const helpers = Object.assign({}, actions, {
    createContentDigest,
    createNodeId,
  })

  const publicKey = pluginOptions.publicKey
  const dataKey = pluginOptions.dataKey

  // you can access plugin options here if need be
  console.log(`App ID: ${pluginOptions.dataKey}`)
  console.log(`Public ID: ${pluginOptions.publicKey}`)

  // simple caching example, you can find in .cache/caches/source-plugin/some-diskstore
  await cache.set(`skynet`, pluginOptions.dataKey)
  console.log("Cache Working: ", await cache.get(`skynet`))

  // touch nodes to ensure they aren't garbage collected
  getNodesByType(POST_NODE_TYPE).forEach(node => touchNode({ nodeId: node.id }))
  //getNodesByType(AUTHOR_NODE_TYPE).forEach(node =>
  //  touchNode({ nodeId: node.id })
  //)

  // store the response from the API in the cache
  const cacheKey = `skydb-cache-${pluginOptions.dataKey}`
  let sourceData = await cache.get(cacheKey)

  // fetch fresh data if nothiing is found in the cache or a plugin option says not to cache data
  if (!sourceData) {
    console.log("Not using cache for source data, fetching fresh content")
    const { data } = await getJSONPost(client, publicKey, dataKey)
    await cache.set(cacheKey, data)
    sourceData = data
  }

  // loop through data returned from the api and create Gatsby nodes for them
  sourceData.forEach(post =>
    createNodeFromData(post, POST_NODE_TYPE, helpers)
  )
  //sourceData.authors.forEach(author =>
  //  createNodeFromData(author, AUTHOR_NODE_TYPE, helpers)
  //)

  return
}

/**
 * ============================================================================
 * Transform remote file nodes
 * ============================================================================
 */

exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node,
}) => {
  // transfrom remote file nodes using Gatsby sharp plugins
  // because onCreateNode is called for all nodes, verify that you are only running this code on nodes created by your plugin
  if (node.internal.type === POST_NODE_TYPE) {
    // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.media,
      getCache,
      createNode,
      createNodeId,
      parentNodeId: node.id,
    })

    if (fileNode) {
      // used to add a field `image` to the Post node from the File node in the schemaCustomization API
      node.image = fileNode.id

      // inference can link these without schemaCustomization like this, but creates a less sturdy schema
      // node.image___NODE = fileNode.id
    }
  }
}
