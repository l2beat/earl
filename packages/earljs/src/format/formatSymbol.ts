import { FormatOptions } from './FormatOptions'

const wellKnownSymbols = new Map<Symbol, string>()
for (const key of Object.getOwnPropertyNames(Symbol)) {
  const known = (Symbol as any)[key]
  if (typeof known === 'symbol') {
    wellKnownSymbols.set(known, `Symbol.${key}`)
  }
}

export function formatSymbol(value: symbol, sibling: unknown, options: FormatOptions) {
  const key = Symbol.keyFor(value)
  if (key) {
    return `Symbol.for(${JSON.stringify(key)})`
  }
  const wellKnown = wellKnownSymbols.get(value)
  if (wellKnown) {
    return wellKnown
  }
  if (
    typeof sibling === 'symbol' &&
    value !== sibling &&
    value.toString() === sibling.toString()
  ) {
    return `${value.toString()} (different)`
  }
  return value.toString()
}
