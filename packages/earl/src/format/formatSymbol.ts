import { toLine } from './toLine.js'

const wellKnownSymbols = new Map<symbol, string>()
for (const key of Object.getOwnPropertyNames(Symbol)) {
  const known = (Symbol as any)[key]
  if (typeof known === 'symbol') {
    wellKnownSymbols.set(known, `Symbol.${key}`)
  }
}

export function formatSymbol(value: symbol, sibling: unknown) {
  const key = Symbol.keyFor(value)
  if (key) {
    return toLine(`Symbol.for(${JSON.stringify(key)})`)
  }
  const wellKnown = wellKnownSymbols.get(value)
  if (wellKnown) {
    return toLine(wellKnown)
  }
  if (
    typeof sibling === 'symbol' &&
    value !== sibling &&
    value.toString() === sibling.toString()
  ) {
    return toLine(`${value.toString()} (different)`)
  }
  return toLine(value.toString())
}
