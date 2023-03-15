import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { between } from '../matchers/between'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeBetween(
      this: Validators<number | bigint>,
      min: number | bigint,
      max: number | bigint,
    ): void
  }
}

registerValidator('toBeBetween', toBeBetween)

export function toBeBetween<T>(
  control: Control<T>,
  min: number | bigint,
  max: number | bigint,
) {
  const actualFmt = formatCompact(control.actual)
  const minFmt = formatCompact(min)
  const maxFmt = formatCompact(max)

  control.assert({
    success: between(min, max)(control.actual),
    reason: `${actualFmt} isn't between ${minFmt} and ${maxFmt}`,
    negatedReason: `${actualFmt} is between ${minFmt} and ${maxFmt}`,
  })
}
