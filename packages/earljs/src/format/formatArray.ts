import { FormatOptions } from './FormatOptions'
import { formatProperties } from './formatProperties'
import { formatUnknown } from './formatUnknown'

export function formatArray(
  value: unknown[],
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const keys = getNonArrayKeys(value)
  if (value.length === 0 && keys.length === 0) {
    return [[0, '[]']]
  }
  stack.push(value)
  const entries = [
    ...formatArrayEntries(value, sibling, options, stack),
    ...formatProperties(keys, value, sibling, options, stack),
  ]
  stack.pop()

  if (options.inline) {
    return [[0, `[${entries.map((x) => x[1]).join(', ')}]`]]
  } else {
    entries.unshift([0, '['])
    entries.push([0, ']'])
    return entries
  }
}

export function formatArrayEntries(value: unknown[], sibling: unknown, options: FormatOptions, stack: unknown[]) {
  const entries: [number, string][] = []
  let empty = 0
  for (let i = 0; i < value.length; i++) {
    if (!value.hasOwnProperty(i.toString())) {
      empty++
    } else {
      if (empty !== 0) {
        entries.push([1, `<${empty} empty items>`])
        empty = 0
      }
      const valueFormat = formatUnknown((value as any)[i], (sibling as any)?.[i], options, stack)
      for (const line of valueFormat) {
        line[0] += 1
      }
      entries.push(...valueFormat)
    }
  }
  if (empty !== 0) {
    entries.push([1, `<${empty} empty items>`])
  }
  return entries
}

export function getNonArrayKeys(value: unknown[]): string[] {
  return Object.keys(value)
    .filter((x) => !/^\d+$/.test(x))
    .sort()
}
