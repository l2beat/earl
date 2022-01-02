import { EqualityOptions } from './EqualityOptions'

export function getType(value: object) {
  if (typeof value === 'function') {
    return 'Function'
  } else if (Array.isArray(value)) {
    return 'Array'
  } else if (value instanceof Date) {
    return 'Date'
  } else if (value instanceof RegExp) {
    return 'RegExp'
  } else if (value instanceof String) {
    return 'String'
  } else if (value instanceof Number) {
    return 'Number'
  } else if (value instanceof Boolean) {
    return 'Boolean'
  } else if (value instanceof Promise) {
    return 'Promise'
  } else if (value instanceof WeakMap) {
    return 'WeakMap'
  } else if (value instanceof WeakSet) {
    return 'WeakSet'
  } else if (value instanceof Error) {
    return 'Error'
  }
  return 'Object'
}

export type ObjectType = ReturnType<typeof getType>
export function getCommonType(value: object, other: object) {
  const valueType = getType(value)
  const otherType = getType(other)
  return valueType === otherType ? valueType : undefined
}

export function getKeys(value: object, type: ObjectType, options: EqualityOptions) {
  let keys = Object.keys(value)
  if (type === 'Array') {
    addKey(keys, value, 'length')
  } else if (type === 'Error') {
    addKey(keys, value, 'name')
    addKey(keys, value, 'message')
    addKey(keys, value, 'code')
    if (options.compareErrorStack) {
      addKey(keys, value, 'stack')
    } else {
      keys = keys.filter((key) => key !== 'stack')
    }
  } else if (type === 'String') {
    keys = keys.filter((key) => !/^\d+$/.test(key))
  }
  return keys.sort()
}

function addKey(keys: string[], value: object, key: string) {
  if (Object.prototype.hasOwnProperty.call(value, key)) {
    keys.push(key)
  }
}
