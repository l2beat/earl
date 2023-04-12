import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { isEqual } from '../../isEqual/index.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that an array is equal to another array if the order of the items
     * is to be disregarded.
     *
     * This validator supports matchers, but extreme caution should be exercised
     * when using them. The algorithm used to compare the arrays does not check
     * all possible permutations, so it is possible that the matcher will match
     * a value that was provided verbatim later in the expected array.
     *
     * **Using matchers with this validator is only recommended for advanced
     * users that know what they are doing!**
     *
     * @param expected - The array of expected items.
     *
     * @example
     * ```ts
     * expect([1, 2, 3]).toEqualUnsorted([3, 1, 2])
     *
     * expect(['foo', 'bar']).not.toEqualUnsorted(['a', 'b', 'c'])
     * ```
     */
    toEqualUnsorted(this: Validators<any[]>, expected: T): void
  }
}

registerValidator('toEqualUnsorted', toEqualUnsorted)

export function toEqualUnsorted(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  if (!Array.isArray(control.actual)) {
    return control.fail({
      reason: `The value ${actualInline} is not an array, but it was expected to be an array.`,
    })
  }

  if (!Array.isArray(expected)) {
    return control.fail({
      reason: `The argument ${expectedInline} is not an array, but it was expected to be an array.`,
    })
  }

  if (control.actual.length !== expected.length) {
    control.assert({
      success: false,
      reason: `The value ${actualInline} has a different length than ${expectedInline}, but is was expected to have the same length.`,
      negatedReason: '',
      actual: control.actual.length,
      expected: expected.length,
    })
  }

  // TODO: this algorithm works really bad with matchers. Is there another way to do this?
  const cloned = [...expected]
  let reordered = []
  for (const item of control.actual) {
    const index = cloned.findIndex((c) => isEqual(item, c))
    if (index !== -1) {
      reordered.push(item)
      cloned.splice(index, 1)
    }
  }
  reordered = [...reordered, ...cloned]

  control.assert({
    success: isEqual(control.actual, reordered),
    reason: `The value ${actualInline} is not unsorted equal to ${expectedInline}, but it was expected to be unsorted equal.`,
    negatedReason: `The value ${actualInline} is unsorted equal to ${expectedInline}, but it was expected not to be unsorted equal.`,
    actual: control.actual,
    expected: reordered,
  })
}
