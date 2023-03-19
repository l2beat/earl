import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { defined } from '../../matchers/basic/defined'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeDefined(): R
  }
}

registerValidator('toBeDefined', toBeDefined)

export function toBeDefined(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: defined()(control.actual),
    reason: `The value ${actualInline} is undefined, but it was expected to be defined.`,
    negatedReason: `The value ${actualInline} is not undefined, but it was expected to be undefined.`,
  })
}
