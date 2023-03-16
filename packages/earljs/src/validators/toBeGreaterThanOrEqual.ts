import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { greaterThanOrEqual } from '../matchers/greaterThanOrEqual'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeGreaterThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeGreaterThanOrEqual', toBeGreaterThanOrEqual)

export function toBeGreaterThanOrEqual(
  control: Control<unknown>,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: greaterThanOrEqual(target)(control.actual),
    reason: `${actualInline} isn't greater than or equal to ${targetInline}`,
    negatedReason: `${actualInline} is greater than or equal to ${targetInline}`,
  })
}
