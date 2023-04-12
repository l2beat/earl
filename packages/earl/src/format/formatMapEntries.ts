import { FormatOptions } from './FormatOptions.js'
import { formatUnknown } from './formatUnknown.js'
import { getOptionsWith } from './getOptionsWith.js'

export function formatMapEntries(
  value: Map<unknown, unknown>,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  let inOrder = value
  if (sibling instanceof Map) {
    inOrder = new Map()
    for (const key of sibling.keys()) {
      if (value.has(key)) {
        inOrder.set(key, value.get(key))
      }
    }
    for (const [key, keyValue] of value) {
      if (!sibling.has(key)) {
        inOrder.set(key, keyValue)
      }
    }
  }

  const valueItems = [...inOrder]
  const siblingItems = sibling instanceof Map ? [...sibling] : []

  const keyOptions = getOptionsWith(options, {
    skipMatcherReplacement: true,
    requireStrictEquality: true,
    maxLineLength: options.maxLineLength - 10,
  })

  const passedValueOptions = getOptionsWith(options, {
    requireStrictEquality: false,
    maxLineLength: options.maxLineLength - 10,
  })

  const entries: [number, string][] = []
  for (let i = 0; i < valueItems.length; i++) {
    const keyFormat = formatUnknown(
      valueItems[i]?.[0],
      siblingItems[i]?.[0],
      keyOptions,
      valueStack,
      siblingStack,
    )
    for (const line of keyFormat) {
      line[0] += 1
    }
    const valueOptions = getOptionsWith(passedValueOptions, {
      skipMatcherReplacement:
        passedValueOptions.skipMatcherReplacement ||
        (sibling instanceof Map && !sibling.has(valueItems[i]?.[0])),
    })
    const valueFormat = formatUnknown(
      valueItems[i]?.[1],
      siblingItems[i]?.[1],
      valueOptions,
      valueStack,
      siblingStack,
    )
    for (const line of valueFormat) {
      line[0] += 1
    }

    const joint = [...keyFormat]
    const last = joint[joint.length - 1]
    if (last !== undefined) {
      last[1] = `${last[1]} => ${valueFormat[0]?.[1] ?? 'undefined'}`
    }
    joint.push(...valueFormat.slice(1))

    entries.push(...joint)
  }
  return entries
}
