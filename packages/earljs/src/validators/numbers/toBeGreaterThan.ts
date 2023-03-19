import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { greaterThan } from '../../matchers/numbers/greaterThan'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeGreaterThan(
      this: Validators<number | bigint, R>,
      target: number | bigint,
    ): R
  }
}

registerValidator('toBeGreaterThan', toBeGreaterThan)

export function toBeGreaterThan(
  control: Control<unknown>,
  target: number | bigint,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)

  control.assert({
    success: greaterThan(target)(control.actual),
    reason: `The value ${actualInline} is not greater than ${targetInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is greater than ${targetInline}, but it was expected not to be.`,
  })
}
