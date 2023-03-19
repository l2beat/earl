import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { nullish } from '../../matchers/basic/nullish'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeNullish(): R
  }
}

registerValidator('toBeNullish', toBeNullish)

export function toBeNullish(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: nullish()(control.actual),
    reason: `The value ${actualInline} is not nullish, but it was expected to be nullish.`,
    negatedReason: `The value ${actualInline} is nullish, but it was expected not to be nullish.`,
  })
}
