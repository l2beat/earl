import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

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

  let passedOptions = options
  if (!options.skipMatcherReplacement) {
    passedOptions = { ...passedOptions, skipMatcherReplacement: true }
  }
  if (!options.requireStrictEquality) {
    passedOptions = { ...passedOptions, requireStrictEquality: true }
  }

  const entries: [number, string][] = []
  for (let i = 0; i < valueItems.length; i++) {
    const keyFormat = formatUnknown(valueItems[i][0], siblingItems[i]?.[0], passedOptions, valueStack, siblingStack)
    for (const line of keyFormat) {
      line[0] += 1
    }
    let nestedOptions = options
    if (
      !options.skipMatcherReplacement &&
      (!siblingItems[i] || (sibling instanceof Map && !sibling.has(valueItems[i][0])))
    ) {
      nestedOptions = { ...nestedOptions, skipMatcherReplacement: true }
    }
    const valueFormat = formatUnknown(valueItems[i][1], siblingItems[i]?.[1], nestedOptions, valueStack, siblingStack)
    for (const line of valueFormat) {
      line[0] += 1
    }

    const joint = [...keyFormat]
    joint[joint.length - 1][1] = `${joint[joint.length - 1][1]} => ${valueFormat[0][1]}`
    joint.push(...valueFormat.slice(1))

    entries.push(...joint)
  }
  return entries
}
