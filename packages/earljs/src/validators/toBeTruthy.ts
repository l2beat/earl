import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { truthy } from '../matchers/truthy'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeTruthy(): void
  }
}

registerValidator('toBeTruthy', toBeTruthy)

export function toBeTruthy(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: truthy()(control.actual),
    reason: `${actualInline} isn't truthy`,
    negatedReason: `${actualInline} is truthy`,
  })
}
