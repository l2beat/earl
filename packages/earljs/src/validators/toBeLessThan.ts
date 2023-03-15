import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { lessThan } from '../matchers/lessThan'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeLessThan(
      this: Validators<number | bigint>,
      target: number | bigint,
    ): void
  }
}

registerValidator('toBeLessThan', toBeLessThan)

export function toBeLessThan<T>(control: Control<T>, target: number | bigint) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: lessThan(target)(control.actual),
    reason: `${actualFmt} isn't less than ${targetFmt}`,
    negatedReason: `${actualFmt} is less than ${targetFmt}`,
  })
}
