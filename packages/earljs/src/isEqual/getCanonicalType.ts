export type CanonicalType = ReturnType<typeof getCanonicalType>

export function getCanonicalType(value: unknown) {
  if (value === null) {
    return 'null'
  } else if (typeof value === 'function') {
    return 'Function'
  } else if (typeof value !== 'object') {
    return typeof value
  } else if (Array.isArray(value)) {
    return 'Array'
  } else if (value instanceof Error) {
    return 'Error'
  } else if (value instanceof Date) {
    return 'Date'
  } else if (value instanceof RegExp) {
    return 'RegExp'
  } else if (value instanceof Map) {
    return 'Map'
  } else if (value instanceof Set) {
    return 'Set'
  } else if (value instanceof Promise) {
    return 'Promise'
  } else if (value instanceof String) {
    return 'String'
  } else if (value instanceof Number) {
    return 'Number'
  } else if (value instanceof Boolean) {
    return 'Boolean'
  } else if (value instanceof WeakMap) {
    return 'WeakMap'
  } else if (value instanceof WeakSet) {
    return 'WeakSet'
  }
  return 'Object'
}
