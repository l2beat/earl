import { EqualityOptions } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'
import { getCommonType, getKeys, ObjectType } from './objectUtils'

export function isEqualObject(
  value: object,
  valueStack: unknown[],
  other: object,
  otherStack: unknown[],
  options: EqualityOptions,
) {
  if (value === other) {
    return true
  }

  const valueIndex = valueStack.indexOf(value)
  const otherIndex = otherStack.indexOf(other)
  if (valueIndex !== -1 || otherIndex !== -1) {
    return valueIndex === otherIndex
  }

  const type = getCommonType(value, other)
  if (!type) {
    return false
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
  }

  if (type === 'Date' || type === 'String' || type === 'Number' || type === 'Boolean') {
    if (value.valueOf() !== other.valueOf()) {
      return false
    }
  }

  if (type === 'RegExp') {
    if (value.toString() !== other.toString()) {
      return false
    }
  }

  if (type === 'Promise' || type === 'WeakMap' || type === 'WeakSet') {
    return value === other
  }

  return isEqualObjectWithType(value, valueStack, other, otherStack, options, type)
}

function isEqualObjectWithType(
  value: object,
  valueStack: unknown[],
  other: object,
  otherStack: unknown[],
  options: EqualityOptions,
  type: ObjectType,
) {
  const keys = getKeys(value, type, options)
  const otherKeys = getKeys(other, type, options)
  if (keys.length !== otherKeys.length) {
    return false
  }
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== otherKeys[i]) {
      return false
    }
  }
  valueStack.push(value)
  otherStack.push(other)
  let result = true
  for (let i = 0; i < keys.length; i++) {
    if (!isEqualUnknown((value as any)[keys[i]], valueStack, (other as any)[otherKeys[i]], otherStack, options)) {
      result = false
      break
    }
  }
  valueStack.pop()
  otherStack.pop()
  return result
}
