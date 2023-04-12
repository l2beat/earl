import { Matcher } from '../expect.js'
import { EqualityOptions } from './EqualityOptions.js'
import { getCanonicalType } from './getCanonicalType.js'
import { isEqualMap } from './isEqualMap.js'
import { isEqualNumber } from './isEqualNumber.js'
import { isEqualObject } from './isEqualObject.js'
import { isEqualSet } from './isEqualSet.js'

export function isEqualUnknown(
  value: unknown,
  valueStack: unknown[],
  other: unknown,
  otherStack: unknown[],
  options: EqualityOptions,
) {
  if (other instanceof Matcher) {
    return other.check(value)
  }

  const type = getCanonicalType(value)
  const otherType = getCanonicalType(other)

  if (type !== otherType) {
    return false
  }

  switch (type) {
    case 'null':
    case 'undefined':
    case 'boolean':
    case 'bigint':
    case 'string':
    case 'symbol':
    case 'Function':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
      return value === other
    case 'number':
      return isEqualNumber(value as number, other as number, options)
  }

  // This check is so late because of isEqualNumber
  if (value === other) {
    return true
  }

  const valueIndex = valueStack.indexOf(value)
  const otherIndex = otherStack.indexOf(other)
  if (valueIndex !== -1 || otherIndex !== -1) {
    return valueIndex === otherIndex
  }

  if (!options.ignorePrototypes) {
    if (Object.getPrototypeOf(value) !== Object.getPrototypeOf(other)) {
      return false
    }
  }

  if (type === 'Array') {
    if ((value as unknown[]).length !== (other as unknown[]).length) {
      return false
    }
  } else if (type === 'Set') {
    if (!isEqualSet(value as Set<unknown>, other as Set<unknown>)) {
      return false
    }
  } else if (type === 'Map') {
    if (
      !isEqualMap(
        value as Map<unknown, unknown>,
        valueStack,
        other as Map<unknown, unknown>,
        otherStack,
        options,
      )
    ) {
      return false
    }
  } else if (
    type === 'Date' ||
    type === 'String' ||
    type === 'Number' ||
    type === 'Boolean'
  ) {
    if ((value as object).valueOf() !== (other as object).valueOf()) {
      return false
    }
  } else if (type === 'RegExp') {
    if ((value as RegExp).toString() !== (other as RegExp).toString()) {
      return false
    }
  }

  return isEqualObject(
    value as object,
    valueStack,
    other as object,
    otherStack,
    options,
    type,
  )
}
