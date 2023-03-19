import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { empty } from '../matchers/objects/empty'

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
    reason: `The value ${actualInline} is not empty, but it was expected to be empty.`,
    negatedReason: `The value ${actualInline} is empty, but it was expected not to be empty.`,
  })
}
