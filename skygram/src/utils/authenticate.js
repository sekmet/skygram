import { createIDX } from './idx'
import { createCeramic } from './ceramic'
import { getAuthenticationProvider } from './web3provider'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { genKeyPairFromSeed, genKeyPairAndSeed } from 'skynet-js'
import { fromString } from 'uint8arrays'

//import didJWT from 'did-jwt'

export const authenticate = async () => {
    const [ceramic, authProvider] = await Promise.all([createCeramic(), getAuthenticationProvider()])
    const idx = await createIDX(ceramic, { authProvider })

    const schemaID = await publishSchema(ceramic, { content: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'SkyDB',
        type: 'object',
    } })

    const definitionID = await createDefinition(ceramic, {
        name: 'SkyDB',
        description: 'SkyDB Seed',
        schema: schemaID.toUrl('base36'),
    })

    const seedKey = definitionID.toString()

    const getKeyPair = async () => {
        let jwe = await idx.get(seedKey)
        //console.log('jwe => ', jwe)

        if (!jwe) {
            jwe = await idx.did.createJWE(fromString(genKeyPairAndSeed().seed), [idx.id])
            //console.log('jwe created => ', jwe)
            await idx.set(seedKey, jwe)
        }

        const decrypted = await idx.did.decryptJWE(jwe)

        return genKeyPairFromSeed(decrypted.toString())
    }

    return await getKeyPair()
}