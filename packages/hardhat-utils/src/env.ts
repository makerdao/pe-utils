import { assert } from 'ts-essentials'

export function getRequiredEnv(key: string): string {
  const value = process.env[key]
  assert(value, `Please provide ${key} in .env file`)

  return value
}

export function getOptionalEnv(key: string): string | undefined {
  return process.env[key]
}
