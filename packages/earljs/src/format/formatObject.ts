import { getType } from '../isEqual/objectUtils'
import { formatArray } from './formatArray'
import { formatDate } from './formatDate'
import { FormatOptions } from './FormatOptions'
import { formatPlainObject } from './formatPlainObject'
import { formatRegExp } from './formatRegExp'

export function formatObject(
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const type = getType(value)
  if (type === 'Array') {
    return formatArray(value as unknown[], sibling, options, stack)
  } else if (type === 'Date') {
    return formatDate(value as Date, sibling, options, stack)
  } else if (type === 'RegExp') {
    return formatRegExp(value as RegExp, sibling, options, stack)
  }
  return formatPlainObject(value, sibling, options, stack)
}
