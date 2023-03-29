export function isEqualSet(value: Set<unknown>, other: Set<unknown>) {
  if (value.size !== other.size) {
    return false
  }

  for (const item of other) {
    if (!value.has(item)) {
      return false
    }
  }

  return true
}
