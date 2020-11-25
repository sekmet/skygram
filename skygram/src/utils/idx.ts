import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from '@ceramicnetwork/key-did-resolver'
import { IDXWeb } from '@ceramicstudio/idx-web'

import type { CeramicApi } from '@ceramicnetwork/ceramic-common'
import type { WebAuthenticateOptions } from '@ceramicstudio/idx-web'

export async function getIDX(ceramic: CeramicApi, options: WebAuthenticateOptions): Promise<IDXWeb> {
    const registry = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic)
    }

    const idx = new IDXWeb({ ceramic, resolver: { registry } })

    await idx.authenticate(options)
    idx.did.setResolver(idx.resolver)

    return idx
}