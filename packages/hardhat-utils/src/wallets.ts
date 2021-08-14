import { providers, Wallet } from 'ethers'

export function getRandomWallets(n: number): Wallet[] {
  const wallets = [...Array(n)]

  return wallets.map(() => Wallet.createRandom())
}

export function connectWallets(wallets: Wallet[], provider: providers.BaseProvider): Wallet[] {
  return wallets.map((w) => w.connect(provider))
}
