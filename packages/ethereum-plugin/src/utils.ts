import { utils, Wallet } from 'ethers'

const LOWERCASE_ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/
const HEX_REGEX = /^0x[0-9-a-fA-F]*$/

/** returns true if the parameter is checksummed address */
export function isAddress(value: string) {
  return HEX_REGEX.test(value) && utils.isAddress(value)
}

export function isNonChecksumAdress(address: string) {
  return address.match(LOWERCASE_ADDRESS_REGEX) !== null
}

export function isHexString(value: string, length?: number) {
  const isHex = HEX_REGEX.test(value)
  const correctLength = length === undefined || value.length === length + 2
  return isHex && correctLength
}

export function isPrivateKey(value: string) {
  if (!isHexString(value, 64)) return false

  try {
    const _ = new Wallet(value)
    return true
  } catch {
    return false
  }
}
