import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { falsy } from '../../matchers/basic/falsy'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeFalsy(): void
  }
}

registerValidator('toBeFalsy', toBeFalsy)

export function toBeFalsy(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: falsy()(control.actual),
    reason: `The value ${actualInline} is not falsy, but it was expected to be falsy.`,
    negatedReason: `The value ${actualInline} is falsy, but it was expected not to be falsy.`,
  })
}
