import { expect } from 'chai'
import { FunctionFragment } from 'ethers/lib/utils'
import { ethers } from 'hardhat'

type FunctionFilter = (f: FunctionFragment) => boolean

export const NON_INSTRUMENTED_FUNCTION_FILTER: FunctionFilter = (f) => !f.format().startsWith('c_0x')
export const NON_MUTABLE_FUNCTION_FILTER: FunctionFilter = (f) => {
  return (
    NON_INSTRUMENTED_FUNCTION_FILTER(f) && // filter out instrumented methods
    f.stateMutability !== 'nonpayable' &&
    f.stateMutability !== 'payable'
  )
}
export const MUTABLE_FUNCTION_FILTER: FunctionFilter = (f) => {
  return (
    NON_INSTRUMENTED_FUNCTION_FILTER(f) && // filter out instrumented methods
    (f.stateMutability === 'nonpayable' || f.stateMutability === 'payable')
  )
}

export async function assertPublicMethods(
  name: string,
  expectedPublicMethods: string[],
  filter: FunctionFilter = NON_INSTRUMENTED_FUNCTION_FILTER,
) {
  const contract = await ethers.getContractFactory(name)
  const allModifiableFns = Object.values(contract.interface.functions)
    .filter(filter)
    .map((f) => f.format())
  expect(allModifiableFns.sort()).to.be.deep.eq(expectedPublicMethods.sort())
}

export async function assertPublicMutableMethods(name: string, expectedPublicMethods: string[]) {
  await assertPublicMethods(name, expectedPublicMethods, MUTABLE_FUNCTION_FILTER)
}

export async function assertPublicNotMutableMethods(name: string, expectedPublicMethods: string[]) {
  await assertPublicMethods(name, expectedPublicMethods, NON_MUTABLE_FUNCTION_FILTER)
}
