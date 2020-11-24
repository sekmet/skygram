import Web3Modal from 'web3modal'
import { EthereumAuthProvider } from '3id-connect'

let web3Modal = {}
if (typeof window !== `undefined`)
web3Modal = new Web3Modal({ network: 'mainnet', cacheProvider: true })

export async function getAuthenticationProvider() {
    const ethProvider = await web3Modal.connect()
    const addresses = await ethProvider.enable()
  
    const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
  
    return authProvider
}