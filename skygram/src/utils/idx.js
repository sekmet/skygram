import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from '@ceramicnetwork/key-did-resolver'
import { IDXWeb } from '@ceramicstudio/idx-web'

export async function createIDX(ceramic, options) {
    //const registry = Object.assign(Object.assign({}, KeyDidResolver.getResolver()), ThreeIdResolver.getResolver(ceramic))
    const registry = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic),
      };
    const idx = new IDXWeb({ ceramic, resolver: { registry } })
    await idx.authenticate(options)
    idx.did.setResolver(idx.resolver)
    window.idx = idx
    return idx
}