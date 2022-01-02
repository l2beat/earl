import { EqualityOptions } from './EqualityOptions'
import { isEqual } from './isEqual'

export function isEqualObject(value: object, other: object, options: EqualityOptions) {
  if (value === other) {
    return true
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
  for (let i = 0; i < keys.length; i++) {
    if (!isEqual((value as any)[keys[i]], (other as any)[otherKeys[i]], options)) {
      return false
    }
  }
  return true
}
