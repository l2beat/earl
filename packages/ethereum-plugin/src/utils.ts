import { utils } from 'ethers'

const HEX_REGEX = /^0x[0-9-a-fA-F]*$/

export function isAddress(value: string) {
  return HEX_REGEX.test(value) && utils.isAddress(value)
}

export function isHexString(value: string, length?: number) {
  const isHex = HEX_REGEX.test(value)
  const correctLength = length === undefined || value.length === length + 2
  return isHex && correctLength
}

export function isPrivateKey(value: string) {
  return isHexString(value, 64)
}
