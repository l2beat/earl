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

  if (arrayMismatch(value, other)) {
    return false
  }

  const valueIndex = valueStack.indexOf(value)
  const otherIndex = otherStack.indexOf(other)
  if (valueIndex !== -1 || otherIndex !== -1) {
    return valueIndex === otherIndex
  }

  const keys = Object.keys(value).sort()
  const otherKeys = Object.keys(other).sort()
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

function arrayMismatch(value: unknown, other: unknown) {
  const a = Array.isArray(value)
  const b = Array.isArray(other)
  return (a || b) && (a !== b || (value as unknown[]).length !== (other as unknown[]).length)
}
