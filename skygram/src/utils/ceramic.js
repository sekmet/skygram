import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { CERAMIC_URL } from '../constants'

export async function createCeramic() {
    window.ceramic = await new Ceramic(CERAMIC_URL)
    return Promise.resolve(window.ceramic)
}