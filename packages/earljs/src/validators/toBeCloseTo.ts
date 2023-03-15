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

export function toBeCloseTo<T>(
  control: Control<T>,
  target: number,
  delta: number,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: closeTo(target, delta)(control.actual),
    reason: `${actualFmt} isn't close to ${targetFmt} +/- ${delta}`,
    negatedReason: `${actualFmt} is close to ${targetFmt} +/- ${delta}`,
  })
}
