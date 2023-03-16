import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { falsy } from '../matchers/falsy'

declare module '../expect' {
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
    reason: `${actualInline} isn't falsy`,
    negatedReason: `${actualInline} is falsy`,
  })
}
