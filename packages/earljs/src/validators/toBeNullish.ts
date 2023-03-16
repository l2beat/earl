import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { nullish } from '../matchers/nullish'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeNullish(): void
  }
}

registerValidator('toBeNullish', toBeNullish)

export function toBeNullish(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: nullish()(control.actual),
    reason: `${actualInline} isn't nullish`,
    negatedReason: `${actualInline} is nullish`,
  })
}
