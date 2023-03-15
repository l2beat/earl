import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { lessThan } from '../matchers/lessThan'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeLessThan(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThan', toBeLessThan)

export function toBeLessThan(
  control: Control<unknown>,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: lessThan(target)(control.actual),
    reason: `${actualInline} isn't less than ${targetInline}`,
    negatedReason: `${actualInline} is less than ${targetInline}`,
  })
}
