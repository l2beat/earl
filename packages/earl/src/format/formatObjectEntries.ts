import { FormatOptions } from './FormatOptions.js'
import { formatUnknown } from './formatUnknown.js'
import { getOptionsWith } from './getOptionsWith.js'

export function formatObjectEntries(
  value: object,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  const keys = getKeys(value, options)
  const entries: [number, string][] = []

  const passedOptions = getOptionsWith(options, {
    requireStrictEquality: false,
    maxLineLength: options.maxLineLength - 10,
  })

  for (const key of keys) {
    const keyFormat = formatKey(key, passedOptions)
    const nestedOptions = getOptionsWith(passedOptions, {
      skipMatcherReplacement:
        passedOptions.skipMatcherReplacement ||
        (!!sibling && !Object.prototype.hasOwnProperty.call(sibling, key)),
    })
    const valueFormat = formatUnknown(
      (value as any)[key],
      (sibling as any)?.[key],
      nestedOptions,
      valueStack,
      siblingStack,
    )
    const first = valueFormat[0]
    if (first !== undefined) {
      first[1] = `${keyFormat}: ${first[1]}`
    }
    for (const line of valueFormat) {
      line[0] += 1
    }
    entries.push(...valueFormat)
  }
  return entries
}

function formatKey(key: string, options: FormatOptions) {
  if (options.inline && key.length > options.maxLineLength - 2) {
    return JSON.stringify(key.slice(0, 7) + '...')
  }
  return /^\w+$/.test(key) ? key : JSON.stringify(key)
}

function getKeys(value: object, options: FormatOptions) {
  let keys = Object.keys(value)
  if (value instanceof Error) {
    addKey(keys, value, 'name')
    addKey(keys, value, 'message')
    addKey(keys, value, 'code')
    if (options.compareErrorStack) {
      addKey(keys, value, 'stack')
    } else {
      keys = keys.filter((key) => key !== 'stack')
    }
  } else if (Array.isArray(value) || value instanceof String) {
    keys = keys.filter((key) => !/^\d+$/.test(key))
  }
  return keys.sort()
}

function addKey(keys: string[], value: object, key: string) {
  if (key in value) {
    keys.push(key)
  }
}
