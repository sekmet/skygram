import { EthereumAuthProvider } from '3id-connect'
import Web3Modal from 'web3modal'

export const web3modal = new Web3Modal({ network: 'mainnet', cacheProvider: true })

export async function getAuthenticationProvider(): Promise<EthereumAuthProvider> {
    const ethereumProvider = await web3modal.connect()
    const accounts = await ethereumProvider.enable()
    //await ethereumProvider.send('eth_requestAccounts')

    return new EthereumAuthProvider(ethereumProvider, accounts[0])
}