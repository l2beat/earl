import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { closeTo } from '../matchers/closeTo'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeCloseTo(this: Validators<number>, target: number, delta: number): void
  }
}

registerValidator('toBeCloseTo', toBeCloseTo)

export function toBeCloseTo(
  control: Control<unknown>,
  target: number,
  delta: number,
) {
  const actualInline = formatCompact(control.actual)
  const targetInline = formatCompact(target)
  const deltaInline = formatCompact(delta)

  control.assert({
    success: closeTo(target, delta)(control.actual),
    reason: `The value ${actualInline} is not close to ${targetInline} +/- ${deltaInline}, but it was expected to be close.`,
    negatedReason: `The value ${actualInline} is close to ${targetInline} +/- ${deltaInline}, but it was expected not to be close.`,
  })
}
