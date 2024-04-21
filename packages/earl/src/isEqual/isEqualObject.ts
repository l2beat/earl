import type { EqualityOptions } from './EqualityOptions.js'
import type { CanonicalType } from './getCanonicalType.js'
import { getKeys } from './getKeys.js'
import { isEqualUnknown } from './isEqualUnknown.js'

export function isEqualObject(
  value: object,
  valueStack: unknown[],
  other: object,
  otherStack: unknown[],
  options: EqualityOptions,
  type: CanonicalType,
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
    if (
      !isEqualUnknown(
        // biome-ignore lint/style/noNonNullAssertion: We know that the key exists
        // biome-ignore lint/suspicious/noExplicitAny: any is required here
        (value as any)[keys[i]!],
        valueStack,
        // biome-ignore lint/style/noNonNullAssertion: We know that the key exists
        // biome-ignore lint/suspicious/noExplicitAny: any is required here
        (other as any)[otherKeys[i]!],
        otherStack,
        options,
      )
    ) {
      result = false
      break
    }
  }
  valueStack.pop()
  otherStack.pop()
  return result
}
