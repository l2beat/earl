import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches `null` and `undefined`.
     *
     * If you want to match a top level value, use `expect(...).toBeNullish()`
     * instead.
     *
     * @example
     * ```ts
     * const result = await flight.getPassenger('17A')
     * expect(result).toEqual({
     *   name: 'John Doe',
     *   seat: '17A',
     *   insurancePolicy: expect.nullish(),
     * })
     * ```
     */
    nullish(): never
  }
}

registerMatcher('nullish', nullish)

export function nullish() {
  return (value: unknown) => value == null
}
