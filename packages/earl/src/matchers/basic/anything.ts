import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches any value.
     *
     * Using this matcher is recommended when you want to ensure that a key is
     * present on an object, but you don't care about its value.
     *
     * @example
     * ```ts
     * const person = findPerson('John Doe')
     * expect(person).toEqual({
     *   name: 'John Doe',
     *   favoriteThing: expect.anything(),
     * })
     * ```
     */
    anything(): never
  }
}

registerMatcher('anything', anything)

export function anything() {
  return () => true
}
