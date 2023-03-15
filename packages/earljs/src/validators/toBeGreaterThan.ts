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

export function toBeGreaterThan<T>(
  control: Control<T>,
  target: number | bigint,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: greaterThan(target)(control.actual),
    reason: `${actualFmt} isn't greater than ${targetFmt}`,
    negatedReason: `${actualFmt} is greater than ${targetFmt}`,
  })
}
