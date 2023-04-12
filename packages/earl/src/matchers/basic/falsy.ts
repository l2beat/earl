import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches falsy values, as defined by:
     * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
     *
     * You can also use its sister matcher, `truthy`, to match the opposite.
     *
     * If you want to match a top level value, use `expect(...).toBeFalsy()`
     * instead.
     *
     * @example
     * ```ts
     * const doggy = dogApi.getDog('Waffles')
     * expect(doggy).toEqual({
     *   name: 'Waffles',
     *   // Waffles is a stray, we don't know the date :(
     *   birthday: expect.falsy(),
     * })
     * ```
     */
    falsy(): never
  }
}

registerMatcher('falsy', falsy)

export function falsy() {
  return (value: unknown) => !value
}
