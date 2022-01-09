import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

export function formatArrayEntries(
  value: unknown[],
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  const entries: [number, string][] = []

  let passedOptions = options
  if (options.requireStrictEquality) {
    passedOptions = { ...passedOptions, requireStrictEquality: false }
  }

  let empty = 0
  for (let i = 0; i < value.length; i++) {
    if (!value.hasOwnProperty(i.toString())) {
      empty++
    } else {
      if (empty !== 0) {
        entries.push(formatEmpty(empty))
        empty = 0
      }
      let nestedOptions = passedOptions
      if (!options.skipMatcherReplacement && sibling && !Object.prototype.hasOwnProperty.call(sibling, i.toString())) {
        nestedOptions = { ...nestedOptions, skipMatcherReplacement: true }
      }
      const valueFormat = formatUnknown(
        (value as any)[i],
        (sibling as any)?.[i],
        nestedOptions,
        valueStack,
        siblingStack,
      )
      for (const line of valueFormat) {
        line[0] += 1
      }
      entries.push(...valueFormat)
    }
  }
  if (empty !== 0) {
    entries.push(formatEmpty(empty))
  }
  return entries
}

function formatEmpty(empty: number): [number, string] {
  if (empty === 1) {
    return [1, '<empty>']
  } else {
    return [1, `<${empty} empty items>`]
  }
}
