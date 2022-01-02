import { getType } from '../isEqual/objectUtils'
import { formatArray } from './formatArray'
import { formatDate } from './formatDate'
import { formatFunction } from './formatFunction'
import { FormatOptions } from './FormatOptions'
import { formatPlainObject } from './formatPlainObject'
import { formatPrimitiveInstance } from './formatPrimitiveInstance'
import { formatRegExp } from './formatRegExp'
import { formatUniqueInstance } from './formatUniqueInstance'

export function formatObject(
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const type = getType(value)
  if (type === 'Function') {
    return formatFunction(value as Function, sibling, options, stack)
  } else if (type === 'Array') {
    return formatArray(value as unknown[], sibling, options, stack)
  } else if (type === 'Date') {
    return formatDate(value as Date, sibling, options, stack)
  } else if (type === 'RegExp') {
    return formatRegExp(value as RegExp, sibling, options, stack)
  } else if (type === 'String' || type === 'Number' || type === 'Boolean') {
    return formatPrimitiveInstance(type, value, sibling, options, stack)
  } else if (type === 'Promise' || type === 'WeakMap' || type === 'WeakSet') {
    return formatUniqueInstance(type, value, sibling, options)
  }
  return formatPlainObject(type, value, sibling, options, stack)
}
