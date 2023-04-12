import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches empty strings, arrays, sets and maps.
     *
     * If you want to match a top level value, use `expect(...).toBeEmpty()`
     * instead.
     *
     * @example
     * ```ts
     * const sadGuy = await people.findWhere({ friendCount: 0 })
     * expect(sadGuy).toEqual({
     *   name: 'John Doe',
     *   friends: expect.empty(),
     * })
     * ```
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
