import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { truthy } from '../../matchers/basic/truthy'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeTruthy(): R
  }
}

registerValidator('toBeTruthy', toBeTruthy)

export function toBeTruthy(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: truthy()(control.actual),
    reason: `The value ${actualInline} is not truthy, but it was expected to be truthy.`,
    negatedReason: `The value ${actualInline} is truthy, but it was expected not to be truthy.`,
  })
}
