import Web3Modal from 'web3modal'
import { EthereumAuthProvider } from '3id-connect'

const web3modal = new Web3Modal({ network: 'mainnet', cacheProvider: true })

export async function getAuthenticationProvider() {
    const ethProvider = await web3modal.connect()
    const addresses = await ethProvider.enable()
  
    const authProvider = await new EthereumAuthProvider(ethProvider, addresses[0])
  
    return authProvider
}

export const cleanWeb3modal = async (provider, wb3modal) => { 
    wb3modal.clearCachedProvider()
  }