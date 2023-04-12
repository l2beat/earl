import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { LOOSE_FORMAT_OPTIONS } from '../../format/FormatOptions.js'
import { format, formatCompact } from '../../format/index.js'
import { isEqual, LOOSE_EQUALITY_OPTIONS } from '../../isEqual/index.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is loosely equal to another value. The equality is
     * checked using recursively, but ignoring object prototypes.
     *
     * This validator also supports asymmetric matchers on the expected value.
     *
     * This validator shouldn't be used for primitives. Use `toEqual` instead.
     *
     * Unlike `toEqual` this validator does not also work on the type level.
     *
     * If you would like instead to check values for referential equality use
     * the `toExactlyEqual` validator instead.
     *
     * @param expected - The expected value. Can include nested matchers.
     *
     * @example
     * ```ts
     * expect(new Vector2(5, 7)).toLooseEqual({
     *   x: 5,
     *   y: expect.greaterThan(0),
     * })
     * ```
     */
    toLooseEqual(this: Validators<object>, expected: unknown): void
  }
}

registerValidator('toLooseEqual', toLooseEqual)

export function toLooseEqual(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected, LOOSE_EQUALITY_OPTIONS),
    reason: `The value ${actualInline} is not loosely equal to ${expectedInline}, but it was expected to be loosely equal.`,
    negatedReason: `The value ${actualInline} is loosely equal to ${expectedInline}, but it was expected not to be loosely equal.`,
    actual: format(control.actual, null, LOOSE_FORMAT_OPTIONS),
    expected: format(expected, control.actual, LOOSE_FORMAT_OPTIONS),
  })
}
