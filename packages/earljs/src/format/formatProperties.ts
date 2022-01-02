import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

export function formatProperties(
  keys: string[],
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
) {
  const entries: [number, string][] = []
  for (const key of keys) {
    const keyFormat = formatKey(key)
    const valueFormat = formatUnknown((value as any)[key], (sibling as any)?.[key], options, stack)
    valueFormat[0][1] = `${keyFormat}: ${valueFormat[0][1]}`
    for (const line of valueFormat) {
      line[0] += 1
    }
    entries.push(...valueFormat)
  }
  return entries
}

function formatKey(key: string) {
  return /^\w+$/.test(key) ? key : JSON.stringify(key)
}
