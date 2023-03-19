import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { safeInteger } from '../../matchers/numbers/safeInteger'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeASafeInteger(this: Validators<number | bigint, R>): R
  }
}

registerValidator('toBeASafeInteger', toBeASafeInteger)

export function toBeASafeInteger(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: safeInteger()(control.actual),
    reason: `The value ${actualInline} is not a safe integer, but it was expected to be a safe integer.`,
    negatedReason: `The value ${actualInline} is a safe integer, but it was expected not to be a safe integer.`,
  })
}
