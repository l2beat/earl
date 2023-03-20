import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { integer } from '../../matchers/numbers/integer'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeAnInteger(this: Validators<number | bigint, R>): R
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
