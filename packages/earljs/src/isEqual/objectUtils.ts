export function getType(value: object) {
  if (Array.isArray(value)) {
    return 'Array'
  } else if (value instanceof Date) {
    return 'Date'
  } else if (value instanceof RegExp) {
    return 'RegExp'
  }
  return 'Object'
}

export type ObjectType = ReturnType<typeof getType>
export function getCommonType(value: object, other: object) {
  const valueType = getType(value)
  const otherType = getType(other)
  return valueType === otherType ? valueType : undefined
}

export function getKeys(value: object, type: ObjectType) {
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
