export type CanonicalType = ReturnType<typeof getCanonicalType>

export function getCanonicalType(value: unknown) {
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'function') {
    return 'Function'
  }
  if (typeof value !== 'object') {
    return typeof value
  }
  if (Array.isArray(value)) {
    return 'Array'
  }
  if (value instanceof Error) {
    return 'Error'
  }
  if (value instanceof Date) {
    return 'Date'
  }
  if (value instanceof RegExp) {
    return 'RegExp'
  }
  if (value instanceof Map) {
    return 'Map'
  }
  if (value instanceof Set) {
    return 'Set'
  }
  if (value instanceof Promise) {
    return 'Promise'
  }
  if (value instanceof String) {
    return 'String'
  }
  if (value instanceof Number) {
    return 'Number'
  }
  if (value instanceof Boolean) {
    return 'Boolean'
  }
  if (value instanceof WeakMap) {
    return 'WeakMap'
  }
  if (value instanceof WeakSet) {
    return 'WeakSet'
  }
  return 'Object'
}
