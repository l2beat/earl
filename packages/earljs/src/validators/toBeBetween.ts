import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { between } from '../matchers/numbers/between'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeBetween(
      this: Validators<number | bigint>,
      min: number | bigint,
      max: number | bigint,
    ): void
  }
}

registerValidator('toBeBetween', toBeBetween)

export function toBeBetween(
  control: Control<unknown>,
  min: number | bigint,
  max: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const minInline = formatCompact(min)
  const maxInline = formatCompact(max)

  control.assert({
    success: between(min, max)(control.actual),
    reason: `The value ${actualInline} is not between ${minInline} and ${maxInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is between ${minInline} and ${maxInline}, but it was expected not to be.`,
  })
}
