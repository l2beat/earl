import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches strings that match a regular expression.
     *
     * @example
     * ```ts
     * // matches strings that start with "foo"
     * expect.regex(/^foo/)
     * ```
     *
     * @param regex - a regular expression to test the matched values.
     */
    regex(regex: RegExp): string
  }
}

registerMatcher('regex', regex)

export function regex(regex: RegExp) {
  return (value: unknown) => {
    if (typeof value !== 'string') {
      return false
    }
    return regex.test(value)
  }
}
