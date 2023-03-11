import { Control } from '../Control'
import { format, formatCompact } from '../format'
import { LOOSE_FORMAT_OPTIONS } from '../format/FormatOptions'
import { isEqual, LOOSE_EQUALITY_OPTIONS } from '../isEqual'

// @todo: follow design of jest's loose equal
export function toLooseEqual(control: Control<unknown>, expected: unknown) {
  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expected)
  const reason = `${actualFmt} not loose equal to ${expectedFmt}`
  const negatedReason = `${actualFmt} loose equal to ${expectedFmt}`

  if (!isEqual(control.actual, expected, LOOSE_EQUALITY_OPTIONS)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: format(control.actual, null, LOOSE_FORMAT_OPTIONS),
      expected: format(expected, control.actual, LOOSE_FORMAT_OPTIONS),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
      actual: format(control.actual, null, LOOSE_FORMAT_OPTIONS),
      expected: format(expected, control.actual, LOOSE_FORMAT_OPTIONS),
    })
  }
}
