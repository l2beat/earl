import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { greaterThanOrEqual } from '../../matchers/numbers/greaterThanOrEqual'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeGreaterThanOrEqual(
      this: Validators<number | bigint, R>,
      target: number | bigint,
    ): R
  }
}

registerValidator('toBeGreaterThanOrEqual', toBeGreaterThanOrEqual)

export function toBeGreaterThanOrEqual(
  control: Control,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: greaterThanOrEqual(target)(control.actual),
    reason: `The value ${actualInline} is not greater than or equal to ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is greater than or equal to ${targetInline}, but it was expected not to be.`,
  })
}
