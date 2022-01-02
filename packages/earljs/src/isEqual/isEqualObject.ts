import { EqualityOptions } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'

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
  const keys = getKeys(value, type)
  const otherKeys = getKeys(other, type)
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

function getCommonType(value: object, other: object) {
  const valueType = getType(value)
  const otherType = getType(other)
  return valueType === otherType ? valueType : undefined
}

type ObjectType = ReturnType<typeof getType>

function getType(value: object) {
  if (Array.isArray(value)) {
    return 'Array'
  }
  return 'Object'
}

function getKeys(value: object, type: ObjectType) {
  const keys = Object.keys(value)
  if (type === 'Array') {
    addKey(keys, value, 'length')
  }
  return keys.sort()
}

function addKey(keys: string[], value: object, key: string) {
  if (Object.prototype.hasOwnProperty.call(value, key)) {
    keys.push(key)
  }
}
