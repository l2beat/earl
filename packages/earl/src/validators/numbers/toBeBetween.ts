import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { between } from '../../matchers/numbers/between.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a number is between the two numbers. The range is
     * `[min, max]`, inclusive on both sides.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a nested value, use the matcher
     * `expect.toBeBetween(min, max)` instead.
     *
     * @param min - The minimum value, inclusive.
     * @param max - The maximum value, inclusive.
     *
     * @example
     * ```ts
     * expect(0.5).toBeBetween(0, 1)
     * expect(100n).toBeBetween(-200n, 200n)
     *
     * expect(20).not.toBeBetween(0, 1)
     * ```
     */
    toBeBetween(
      this: Validators<number | bigint>,
      min: number | bigint,
      max: number | bigint,
    ): void
  }
}

registerValidator('toBeBetween', toBeBetween)

export function toBeBetween(
  control: Control,
  min: number | bigint,
  max: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const minInline = formatCompact(min)
  const maxInline = formatCompact(max)

  control.assert({
    success: between(min, max)(control.actual),
    reason: `The value ${actualInline} is not between ${minInline} and ${maxInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is between ${minInline} and ${maxInline}, but it was expected not to be.`,
  })
}
