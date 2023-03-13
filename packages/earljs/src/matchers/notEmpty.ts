import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches strings, arrays, sets and maps that aren't empty.
     */
    notEmpty(): string & any[] & never[] & Set<any> & Map<any, any>
  }
}

registerMatcher('notEmpty', notEmpty)

export function notEmpty() {
  return (value: unknown) => {
    if (typeof value === 'string') return value.length > 0
    if (Array.isArray(value)) return value.length > 0
    if (value instanceof Set) return value.size > 0
    if (value instanceof Map) return value.size > 0
    return false
  }
}
