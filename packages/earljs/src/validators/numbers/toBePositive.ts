import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { positive } from '../../matchers/numbers/positive'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBePositive(this: Validators<number | bigint, R>): R
  }
}

registerValidator('toBePositive', toBePositive)

export function toBePositive(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: positive()(control.actual),
    reason: `The value ${actualInline} is not positive, but it was expected to be positive.`,
    negatedReason: `The value ${actualInline} is positive, but it was expected not to be positive.`,
  })
}
