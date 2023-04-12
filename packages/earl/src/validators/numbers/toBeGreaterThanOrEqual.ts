import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { greaterThanOrEqual } from '../../matchers/numbers/greaterThanOrEqual.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a number is greater than or equal to the target value.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a nested value, use the matcher
     * `expect.greaterThanOrEqual(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect(100_000n).toBeGreaterThanOrEqual(50_000n)
     * expect(1337n).toBeGreaterThanOrEqual(1337n)
     *
     * expect(0xcafebabe).not.toBeGreaterThanOrEqual(0xdeadbeef)
     * ```
     */
    toBeGreaterThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeGreaterThanOrEqual', toBeGreaterThanOrEqual)

export function toBeGreaterThanOrEqual(
  control: Control,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: greaterThanOrEqual(target)(control.actual),
    reason: `The value ${actualInline} is not greater than or equal to ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is greater than or equal to ${targetInline}, but it was expected not to be.`,
  })
}
