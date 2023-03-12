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
  const reason = `${actualFmt} not equal to ${expectedFmt}`
  const negatedReason = `${actualFmt} equal to ${expectedFmt}`

  if (!isEqual(control.actual, expected)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: format(control.actual, null),
      expected: format(expected, control.actual),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
      actual: format(control.actual, null),
      expected: format(expected, control.actual),
    })
  }
}
