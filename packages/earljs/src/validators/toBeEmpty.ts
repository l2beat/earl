import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { empty } from '../matchers/empty'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeEmpty(this: Validators<string | any[] | Set<any> | Map<any, any>>): void
  }
}

registerValidator('toBeEmpty', toBeEmpty)

export function toBeEmpty(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: empty()(control.actual),
    reason: `${actualInline} isn't empty`,
    negatedReason: `${actualInline} is empty`,
  })
}
