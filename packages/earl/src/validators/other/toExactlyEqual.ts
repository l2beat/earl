import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is referentially equal to the expected value.
     *
     * This validator shouldn't be used for primitives or deep equality checks.
     * Use `toEqual` instead.
     *
     * @param expected - The expected value.
     *
     * @example
     * ```ts
     * const vector = { x: 5, y: 7 }
     * expect(vector).toExactlyEqual(vector)
     *
     * expect(vector).not.toExactlyEqual({ x: 5, y: 7 })
     * ```
     */
    toExactlyEqual(this: Validators<object>, expected: unknown): void
  }
}

registerValidator('toExactlyEqual', toExactlyEqual)

export function toExactlyEqual(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: sameValueZero(control.actual, expected),
    reason: `The value ${actualInline} is not the exact same value as ${expectedInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is the exact same value as ${expectedInline}, but it was expected not to be.`,
    actual: control.actual,
    expected,
  })
}

function sameValueZero(x: unknown, y: unknown) {
  if (typeof x === 'number' && typeof y === 'number') {
    // x and y are equal (may be -0 and 0) or they are both NaN
    return x === y || (x !== x && y !== y)
  }
  return x === y
}
