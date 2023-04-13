import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { Subset, subset } from '../../matchers/objects/subset.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that an object contains the given key value pairs.
     *
     * If you want to match a nested value, use the matcher
     * `expect.subset(subset)` instead.
     *
     * @param subset - The expected key-value pairs that the object has.
     *
     * @example
     * ```ts
     * const response = await api.get('/users/me')
     * expect(response).toHaveSubset({
     *   success: expect.a(Boolean),
     *   data: expect.subset({
     *     name: 'John Doe',
     *     age: 42,
     *   }),
     * })
     * ```
     */
    toHaveSubset(this: Validators<object>, subset: Subset): void
  }
}

registerValidator('toHaveSubset', toHaveSubset)

export function toHaveSubset(control: Control, expected: Subset): void {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)
  control.assert({
    success: subset(expected)(control.actual),
    reason: `The value ${actualInline} does not have a subset of ${expectedInline}, but it was expected to.`,
    negatedReason: `The value ${actualInline} does has a subset of ${expectedInline}, but it was expected not to.`,
  })
}
