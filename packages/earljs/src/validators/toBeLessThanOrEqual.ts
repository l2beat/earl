import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { lessThanOrEqual } from '../matchers/lessThanOrEqual'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeLessThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThanOrEqual', toBeLessThanOrEqual)

export function toBeLessThanOrEqual(
  control: Control<unknown>,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: lessThanOrEqual(target)(control.actual),
    reason: `${actualInline} isn't less than or equal to ${targetInline}`,
    negatedReason: `${actualInline} is less than or equal to ${targetInline}`,
  })
}
