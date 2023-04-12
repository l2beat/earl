import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { lessThanOrEqual } from '../../matchers/numbers/lessThanOrEqual.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a number is less than or equal to the target value.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a nested value, use the matcher
     * `expect.lessThanOrEqual(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect(50_000n).toBeLessThanOrEqual(100_000n)
     * expect(1337n).toBeLessThanOrEqual(1337n)
     *
     * expect(0xdeadbeef).not.toBeLessThanOrEqual(0xcafebabe)
     * ```
     */
    toBeLessThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThanOrEqual', toBeLessThanOrEqual)

export function toBeLessThanOrEqual(control: Control, target: number | bigint) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: lessThanOrEqual(target)(control.actual),
    reason: `The value ${actualInline} is not less than or equal to ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is less than or equal to ${targetInline}, but it was expected not to be.`,
  })
}
