import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { lessThan } from '../../matchers/numbers/lessThan.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a number is less the target value.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a nested value, use the matcher
     * `expect.lessThan(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect(50_000n).toBeLessThan(100_000n)
     *
     * expect(1337n).not.toBeLessThan(1337n)
     * expect(0xdeadbeef).not.toBeLessThan(0xcafebabe)
     * ```
     */
    toBeLessThan(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThan', toBeLessThan)

export function toBeLessThan(control: Control, target: number | bigint) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: lessThan(target)(control.actual),
    reason: `The value ${actualInline} is not less than ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is less than ${targetInline}, but it was expected not to be.`,
  })
}
