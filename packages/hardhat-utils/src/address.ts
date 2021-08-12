import { Signer, Wallet } from 'ethers'
import { getContractAddress } from 'ethers/lib/utils'

export async function getAddressOfNextDeployedContract(signer: Signer): Promise<string> {
  return getContractAddress({
    from: await signer.getAddress(),
    nonce: await signer.getTransactionCount(),
  })
}

export async function getRandomAddress(): Promise<string> {
  return await Wallet.createRandom().getAddress()
}

export async function getRandomAddresses(n: number = 10): Promise<string[]> {
  const arr = [...Array(n).keys()]

  return await Promise.all(arr.map(getRandomAddress))
}
