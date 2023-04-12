import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { safeInteger } from '../../matchers/numbers/safeInteger.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is an integer or a bigint and falls within the safe
     * range of values as defined by `Number.MIN_SAFE_INTEGER` and
     * `Number.MAX_SAFE_INTEGER`.
     *
     * If you want to match a nested value, use the matcher
     * `expect.safeInteger()` instead.
     *
     * @example
     * ```ts
     * expect(100).toBeASafeInteger()
     * expect(100n).toBeASafeInteger()
     *
     * expect(100.5).not.toBeASafeInteger()
     * expect(Number.MAX_SAFE_INTEGER * 2).not.toBeASafeInteger()
     * ```
     */
    toBeASafeInteger(this: Validators<number | bigint>): void
  }
}

registerValidator('toBeASafeInteger', toBeASafeInteger)

export function toBeASafeInteger(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: safeInteger()(control.actual),
    reason: `The value ${actualInline} is not a safe integer, but it was expected to be a safe integer.`,
    negatedReason: `The value ${actualInline} is a safe integer, but it was expected not to be a safe integer.`,
  })
}
