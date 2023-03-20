import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { negative } from '../../matchers/numbers/negative'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeNegative(this: Validators<number | bigint>): void
  }
}

registerValidator('toBeNegative', toBeNegative)

export function toBeNegative(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: negative()(control.actual),
    reason: `The value ${actualInline} is not negative, but it was expected to be negative.`,
    negatedReason: `The value ${actualInline} is negative, but it was expected not to be negative.`,
  })
}
