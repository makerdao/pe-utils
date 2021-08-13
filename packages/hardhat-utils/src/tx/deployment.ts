import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { isEmpty } from 'lodash'

import { ContractFactoryLike } from '../types'

export async function simpleDeploy<T extends ContractFactoryLike>(
  name: string,
  args: Parameters<T['deploy']>,
): Promise<ReturnType<T['deploy']>> {
  const factory = (await ethers.getContractFactory(name)) as any
  return factory.deploy(...(args as any))
}

export async function deployUsingFactory<T extends ContractFactoryLike>(
  signer: Signer,
  factory: T,
  args: Parameters<T['deploy']>,
): Promise<ReturnType<T['deploy']>> {
  const contractFactory = new ethers.ContractFactory(factory.interface, factory.bytecode, signer)
  const contractDeployed = await contractFactory.deploy(...(args as any))

  await contractDeployed.deployed()

  return contractDeployed as any
}

export async function deployUsingFactoryAndVerify<T extends ContractFactoryLike>(
  signer: Signer,
  factory: T,
  args: Parameters<T['deploy']>,
): Promise<ReturnType<T['deploy']>> {
  const contractDeployed = await deployUsingFactory(signer, factory, args)

  console.log(
    `npx hardhat verify ${contractDeployed.address} ${args
      .filter((a: any) => a.gasPrice === undefined && !isEmpty(a))
      .join(' ')}`,
  )

  return contractDeployed as any
}
