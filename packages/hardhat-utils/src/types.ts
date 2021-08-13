import { Signer } from 'ethers'
import { Interface } from 'ethers/lib/utils'

export type ContractLike = {
  readonly address: string
  readonly interface: Interface

  readonly signer: Signer
}

export type ContractFactoryLike = {
  interface: any
  bytecode: any
  deploy(...args: Array<any>): Promise<ContractLike>
}
