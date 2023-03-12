import { Control } from '../Control'
import { registerValidator } from '../expect'
import { format, formatCompact } from '../format'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Validators<T> {
    toEqual(expected: T): void
  }
}

registerValidator('toEqual', toEqual)

export function toEqual<T>(control: Control<T>, expected: T) {
  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected),
    reason: `${actualFmt} not equal to ${expectedFmt}`,
    negatedReason: `${actualFmt} equal to ${expectedFmt}`,
    actual: format(control.actual, null),
    expected: format(expected, control.actual),
  })
}
