import { Control } from '../Control'
import { format, formatCompact } from '../format'
import { isEqual } from '../isEqual'

export function toReferentiallyEqual<T>(control: Control<T>, expected: T) {
  const smartEqComparisonResult = isEqual(control.actual, expected)
  const strictComparisonResult = Object.is(control.actual, expected)

  const additionalInfo =
    !strictComparisonResult && smartEqComparisonResult ? '. Did you mean to use `toEqual` instead?' : ''

  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expected)

  const reason = `${actualFmt} is not ${expectedFmt}${additionalInfo}`
  const negatedReason = `${actualFmt} is ${expectedFmt}`

  control.assert({
    success: strictComparisonResult,
    reason,
    negatedReason,
    actual: format(control.actual, null),
    expected: format(expected, control.actual),
  })
}
