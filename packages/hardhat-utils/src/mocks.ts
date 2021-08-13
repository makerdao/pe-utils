import { smockit } from '@eth-optimism/smock'
import { ContractFactory } from 'ethers'
import { readFileSync } from 'fs'
import { assert } from 'ts-essentials'

import { ContractFactoryLike } from './types'

export async function deployContractMock<T extends ContractFactoryLike>(
  path: string,
  opts: {
    provider?: any
    address?: string
  } = {},
): Promise<ReturnType<T['deploy']> & { smocked: any }> {
  const artifact = JSON.parse(readFileSync(path, 'utf-8'))
  assert(artifact.abi, `${path} doesn't contain key abi`)
  const factory = new ContractFactory(artifact.abi, artifact.bytecode ?? '0x') as any
  return await smockit(factory, opts)
}
