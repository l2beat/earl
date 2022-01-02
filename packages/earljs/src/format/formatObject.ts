import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

export function formatObject(value: object, sibling: unknown, options: FormatOptions): [number, string][] {
  const keys = Object.keys(value).sort()
  if (keys.length === 0) {
    return [[0, '{}']]
  }
  const entries: [number, string][] = []
  for (const key of keys) {
    try {
      const keyFormat = formatKey(key)
      const valueFormat = formatUnknown((value as any)[key], (sibling as any)?.[key], options)
      valueFormat[0][1] = `${keyFormat}: ${valueFormat[0][1]}`
      for (const line of valueFormat) {
        line[0] += 1
      }
      entries.push(...valueFormat)
    } catch (e: any) {
      if (e.stack.length > 2000) {
        throw new Error('foo')
      }
    }
  }

  if (options.inline) {
    return [[0, `{ ${entries.map((x) => x[1]).join(', ')} }`]]
  } else {
    entries.unshift([0, '{'])
    entries.push([0, '}'])
    return entries
  }
}

function formatKey(key: string) {
  return /^\w+$/.test(key) ? key : JSON.stringify(key)
}
