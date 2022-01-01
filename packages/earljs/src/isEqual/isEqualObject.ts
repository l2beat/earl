import { EqualityOptions } from './EqualityOptions'
import { isEqual } from './isEqual'
import { sortSymbols } from './sortSymbols'

export function isEqualObject(value: object, other: object, options: EqualityOptions) {
  if (value === other) {
    return true
  }
  const keys = getObjectKeys(value, options)
  const otherKeys = getObjectKeys(other, options, Object.getOwnPropertySymbols(value))
  if (keys.length !== otherKeys.length) {
    return false
  }
  for (let i = 0; i < keys.length; i++) {
    if (
      !isEqual(keys[i], otherKeys[i], options) ||
      !isEqual((value as any)[keys[i]], (other as any)[otherKeys[i]], options)
    ) {
      return false
    }
  }
  return true
}

function getObjectKeys(value: object, options: EqualityOptions, otherSymbols: symbol[] = []) {
  const properties = Object.getOwnPropertyNames(value)
  let symbols = Object.getOwnPropertySymbols(value)
  if (!options.strictObjectKeyOrder) {
    properties.sort()
    symbols = sortSymbols(symbols, otherSymbols)
  }
  return [...properties, ...symbols]
}
