import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches values that are not nullish, i.e. values that are not `null` or
     * `undefined`.
     *
     * If you want to match a top level value, use
     * `expect(...).not.toBeNullish()` instead.
     *
     * @example
     * ```ts
     * const result = await fetchStockPrices('BANANA', 'KIWI')
     * expect(result).toEqual({
     *   BANANA: expect.notNullish(),
     *   KIWI: expect.notNullish(),
     * })
     * ```
     */
    notNullish(): never
  }
}

registerMatcher('notNullish', notNullish)

export function notNullish() {
  return (value: unknown) => value != null
}
