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
    reason: `${actualInline} isn't close to ${targetInline} +/- ${deltaInline}`,
    negatedReason: `${actualInline} is close to ${targetInline} +/- ${deltaInline}`,
  })
}
