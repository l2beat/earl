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

export function toBeGreaterThanOrEqual<T>(
  control: Control<T>,
  target: number | bigint,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: greaterThanOrEqual(target)(control.actual),
    reason: `${actualFmt} isn't greater than or equal to ${targetFmt}`,
    negatedReason: `${actualFmt} is greater than or equal to ${targetFmt}`,
  })
}
