import { sortSymbols } from '../isEqual/sortSymbols'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'
import { formatUnknown } from './formatUnknown'

export function formatObject(value: object, sibling: unknown, options: FormatOptions): [number, string][] {
  const keys = getKeys(value, sibling, options)
  if (keys.length === 0) {
    return [[0, '{}']]
  }
  const entries: [number, string][] = []
  for (const [key, keyFormat] of keys) {
    const valueFormat = formatUnknown((value as any)[key], (sibling as any)?.[key], options)
    valueFormat[0][1] = `${keyFormat}: ${valueFormat[0][1]}`
    for (const line of valueFormat) {
      line[0] += 1
    }
    entries.push(...valueFormat)
  }

  if (options.inline) {
    return [[0, `{ ${entries.map((x) => x[1]).join(', ')} }`]]
  } else {
    entries.unshift([0, '{'])
    entries.push([0, '}'])
    return entries
  }
}

export function getKeys(value: object, sibling: unknown, options: FormatOptions) {
  const result: [string | symbol, string][] = []
  const properties = Object.getOwnPropertyNames(value)
  if (!options.strictObjectKeyOrder) {
    properties.sort()
  }
  for (const prop of properties) {
    result.push([prop, formatKey(prop)])
  }
  let symbols = Object.getOwnPropertySymbols(value)
  let siblingSymbols = Object.getOwnPropertySymbols(sibling ?? {})
  if (!options.strictObjectKeyOrder) {
    symbols = sortSymbols(symbols, siblingSymbols)
    siblingSymbols = sortSymbols(siblingSymbols, [])
  }
  for (let i = 0; i < symbols.length; i++) {
    result.push([symbols[i], formatSymbol(symbols[i], siblingSymbols[i], options)])
  }
  return result
}

function formatKey(key: string) {
  return /^\w+$/.test(key) ? key : JSON.stringify(key)
}
