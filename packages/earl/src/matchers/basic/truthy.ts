import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches truthy values, as defined by:
     * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
     *
     * You can also use its sister matcher, `falsy`, to match the opposite.
     *
     * If you want to match a top level value, use `expect(...).toBeTruthy()`
     * instead.
     *
     * @example
     * ```ts
     * const kitty = catApi.getCat('Peanut')
     * expect(kitty).toEqual({
     *   name: 'Peanut',
     *   // they are a happy family, but we don't care about the details
     *   mom: expect.truthy(),
     *   dad: expect.truthy(),
     * })
     * ```
     */
    truthy(): never
  }
}

registerMatcher('truthy', truthy)

export function truthy() {
  return (value: unknown) => !!value
}
