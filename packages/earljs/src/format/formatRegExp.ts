import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'
import { getTypeName } from './getTypeName'

export function formatRegExp(
  value: RegExp,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  let formatted = value.toString()
  if (!options.ignorePrototypes) {
    const name = getTypeName(value, sibling)
    if (name !== 'RegExp') {
      formatted = `${name} ${formatted}`
    }
  }
  return formatWithObject('RegExp', formatted, value, sibling, options, valueStack, siblingStack)
}
