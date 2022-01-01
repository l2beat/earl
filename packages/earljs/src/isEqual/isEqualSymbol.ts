import { EqualityOptions } from './EqualityOptions'

export function isEqualSymbol(value: symbol, other: symbol, options: EqualityOptions) {
  if (Symbol.keyFor(value) !== Symbol.keyFor(other)) {
    return false
  }
  if (options.looseSymbolCompare) {
    return value.toString() === other.toString()
  } else {
    return value === other
  }
}
