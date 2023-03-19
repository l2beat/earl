import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { greaterThan } from '../matchers/greaterThan'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeGreaterThan(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
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
