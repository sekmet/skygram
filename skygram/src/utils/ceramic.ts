import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { CERAMIC_URL } from '../constants'

export async function getCeramic(): Promise<Ceramic> {
    return new Ceramic(CERAMIC_URL)
}