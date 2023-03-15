import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { lessThanOrEqual } from '../matchers/lessThanOrEqual'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeLessThanOrEqual(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThanOrEqual', toBeLessThanOrEqual)

export function toBeLessThanOrEqual<T>(
  control: Control<T>,
  target: number | bigint,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: lessThanOrEqual(target)(control.actual),
    reason: `${actualFmt} isn't less than or equal to ${targetFmt}`,
    negatedReason: `${actualFmt} is less than or equal to ${targetFmt}`,
  })
}
