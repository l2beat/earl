import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { lessThanOrEqual } from '../../matchers/numbers/lessThanOrEqual'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeLessThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThanOrEqual', toBeLessThanOrEqual)

export function toBeLessThanOrEqual(control: Control, target: number | bigint) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: lessThanOrEqual(target)(control.actual),
    reason: `The value ${actualInline} is not less than or equal to ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is less than or equal to ${targetInline}, but it was expected not to be.`,
  })
}
