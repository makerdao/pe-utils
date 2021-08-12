import { expect } from 'chai'
import { ethers } from 'hardhat'

export async function assertPublicMutableMethods(name: string, expectedPublicMethods: string[]) {
  const contract = await ethers.getContractFactory(name)

  const allModifiableFns = Object.values(contract.interface.functions)
    .filter((f) => {
      return f.stateMutability === 'nonpayable' || f.stateMutability === 'payable'
    })
    .map((f) => f.format())

  expect(allModifiableFns.sort()).to.be.deep.eq(expectedPublicMethods.sort())
}

export async function assertPublicNotMutableMethods(name: string, expectedPublicMethods: string[]) {
  const contract = await ethers.getContractFactory(name)

  const allModifiableFns = Object.values(contract.interface.functions)
    .filter((f) => {
      return !(f.stateMutability === 'nonpayable' || f.stateMutability === 'payable')
    })
    .map((f) => f.format())

  expect(allModifiableFns.sort()).to.be.deep.eq(expectedPublicMethods.sort())
}
