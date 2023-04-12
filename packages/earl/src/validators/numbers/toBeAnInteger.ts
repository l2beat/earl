import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { integer } from '../../matchers/numbers/integer.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is an integer or a bigint.
     *
     * You can also check that the integer is within the safe range of values by
     * using `expect(...).toBeASafeInteger()`
     *
     * If you want to match a nested value, use the matcher `expect.integer()`
     * instead.
     *
     * @example
     * ```ts
     * expect(100).toBeAnInteger()
     * expect(100n).toBeAnInteger()
     *
     * expect(100.5).not.toBeAnInteger()
     * ```
     */
    toBeAnInteger(this: Validators<number | bigint>): void
  }
}

registerValidator('toBeAnInteger', toBeAnInteger)

export function toBeAnInteger(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: integer()(control.actual),
    reason: `The value ${actualInline} is not an integer, but it was expected to be an integer.`,
    negatedReason: `The value ${actualInline} is an integer, but it was expected not to be an integer.`,
  })
}
