import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches empty strings, arrays, sets and maps.
     */
    empty(): never
  }
}

registerMatcher('empty', empty)

export function empty() {
  return (value: unknown) => {
    if (typeof value === 'string') return value.length === 0
    if (Array.isArray(value)) return value.length === 0
    if (value instanceof Set) return value.size === 0
    if (value instanceof Map) return value.size === 0
    return false
  }
}
