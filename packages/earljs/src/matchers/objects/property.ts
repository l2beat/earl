import { registerMatcher } from '../../expect'
import { isEqual } from '../../isEqual'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches objects for which a given key exists. Optionally checks the property value.
     *
     * @param key - property key
     * @param expected - optional property value
     */
    property(key: string, expected?: unknown): any
  }
}

registerMatcher('property', property)

export function property(key: string, expected?: unknown) {
  const hasValue = arguments.length >= 2
  return (value: unknown) => {
    if (typeof value !== 'object' || value === null) {
      return false
    }
    if (!Reflect.has(value, key)) {
      return false
    }
    return !hasValue || isEqual(Reflect.get(value, key), expected)
  }
}
