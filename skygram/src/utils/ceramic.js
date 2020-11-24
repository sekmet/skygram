import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { CERAMIC_URL } from '../constants'

export async function createCeramic() {
    const ceramic = await new Ceramic(CERAMIC_URL)
    return Promise.resolve(ceramic)
}