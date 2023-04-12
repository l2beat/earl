import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches values that are not `undefined`.
     *
     * If you want to match a top level value, use
     * `expect(...).not.toEqual(undefined)` instead.
     *
     * @example
     * ```ts
     * const result = await fetchStockPrices('BANANA', 'KIWI')
     * expect(result).toEqual({
     *   BANANA: expect.defined(),
     *   KIWI: expect.defined(),
     * })
     * ```
     */
    defined(): never
  }
}

registerMatcher('defined', defined)

export function defined() {
  return (value: unknown) => value !== undefined
}
