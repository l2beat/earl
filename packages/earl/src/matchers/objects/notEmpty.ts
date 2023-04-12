import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches strings, arrays, sets and maps that aren't empty.
     *
     * If you want to match a top level value, use `expect(...).not.toBeEmpty()`
     * instead.
     *
     * @example
     * ```ts
     * const happyGuy = await people.findWhere({ friendCount: 42 })
     * expect(happyGuy).toEqual({
     *   name: 'John Doe',
     *   friends: expect.notEmpty(),
     * })
     * ```
     */
    notEmpty(): never
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
