import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { subset } from '../../matchers/objects/subset.js'

export type SubsetMatchable = Record<string, any>

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
    toHaveSubset: (
      this: Validators<SubsetMatchable>,
      subset: SubsetMatchable,
    ) => void
  }
}

registerValidator('toHaveSubset', toHaveSubset)

export function toHaveSubset(
  control: Control,
  expected: SubsetMatchable,
): void {
  const actualInline = formatCompact(control.actual)
  const subsetInline = formatCompact(expected)
  control.assert({
    success: subset(expected)(control.actual),
    reason: `${subsetInline} is not a subset of object ${actualInline}`,
    negatedReason: `${subsetInline} is a subset of object ${actualInline}, but it was expected not to be`,
  })
}
