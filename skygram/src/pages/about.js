import React from "react"
import { rhythm } from "../utils/typography"
import Layout from "../layouts"

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div
          css={{
            padding: rhythm(3 / 4),
          }}
        >
          <h1 data-testid="about-title">About Skygram</h1>
          <p>
            Skygram is an Instagram clone for the Decentralized Web.
            {` `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/gatsbyjs/gatsby"
            >
              Gatsby
            </a>
            .
          </p>
          <p>
            The code for the site lives at
            {` `}
            <a
              href="https://github.com/gatsbyjs/gatsby/tree/master/examples/gatsbygram"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://github.com/gatsbyjs/gatsby/tree/master/examples/gatsbygram
            </a>
          </p>
          <p>
            <a href="https://www.gatsbyjs.com/blog/gatsbygram-case-study/">
              Read a case study on how Skygram was built
            </a>
          </p>
        </div>
      </Layout>
    )
  }
}

export default About
