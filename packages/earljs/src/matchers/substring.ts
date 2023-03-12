import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches strings that include a given substring.
     *
     * @example
     * ```ts
     * // matches strings that include "foo"
     * expect.substring('foo')
     * ```
     *
     * @param substring - a substring to search for in matched values.
     */
    substring(substring: string): string
  }
}

registerMatcher('substring', substring)

export function substring(substring: string) {
  return (value: unknown) => {
    if (typeof value !== 'string') {
      return false
    }
    return value.includes(substring)
  }
}
