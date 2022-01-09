import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

export function formatSetEntries(
  value: Set<unknown>,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  let inOrder = value
  if (sibling instanceof Set) {
    inOrder = new Set()
    for (const item of sibling) {
      if (value.has(item)) {
        inOrder.add(item)
      }
    }
    for (const item of value) {
      inOrder.add(item)
    }
  }

  const valueItems = [...inOrder]
  const siblingItems = sibling instanceof Set ? [...sibling] : []

  let passedOptions = options
  if (!options.skipMatcherReplacement) {
    passedOptions = { ...passedOptions, skipMatcherReplacement: true }
  }
  if (!options.requireStrictEquality) {
    passedOptions = { ...passedOptions, requireStrictEquality: true }
  }
  passedOptions = { ...passedOptions, maxLineLength: options.maxLineLength - 10 }

  const entries: [number, string][] = []

  for (let i = 0; i < valueItems.length; i++) {
    const valueFormat = formatUnknown(valueItems[i], siblingItems[i], passedOptions, valueStack, siblingStack)
    for (const line of valueFormat) {
      line[0] += 1
    }
    entries.push(...valueFormat)
  }
  return entries
}
