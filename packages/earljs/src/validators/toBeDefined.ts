import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { defined } from '../matchers/defined'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeDefined(): void
  }
}

registerValidator('toBeDefined', toBeDefined)

export function toBeDefined(control: Control<unknown>) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: defined()(control.actual),
    reason: `${actualInline} isn't defined`,
    negatedReason: `${actualInline} isn't undefined`,
  })
}
