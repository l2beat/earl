import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { closeTo } from '../../matchers/numbers/closeTo.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a number is close to the target value.The range is
     * `[target - delta, target + delta]`, inclusive on both sides.
     *
     * Works only for numbers and not for bigints.
     *
     * If you want to match a nested value, use the matcher
     * `expect.toBeCloseTo(target, delta)` instead.
     *
     * @param target - The number to aim for.
     * @param delta - The maximum difference between the values.
     *
     * @example
     * ```ts
     * expect(0.5).toBeBetween(0, 1)
     * expect(100n).toBeBetween(-200n, 200n)
     *
     * expect(20).not.toBeBetween(0, 1)
     * ```
     */
    toBeCloseTo(this: Validators<number>, target: number, delta: number): void
  }
}

registerValidator('toBeCloseTo', toBeCloseTo)

export function toBeCloseTo(control: Control, target: number, delta: number) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)
  const deltaInline = formatCompact(delta)

  control.assert({
    success: closeTo(target, delta)(control.actual),
    reason: `The value ${actualInline} is not close to ${targetInline} +/- ${deltaInline}, but it was expected to be close.`,
    negatedReason: `The value ${actualInline} is close to ${targetInline} +/- ${deltaInline}, but it was expected not to be close.`,
  })
}
