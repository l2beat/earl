import { Control } from '../Control'
import { isEqual } from '../isEqual'
import { formatValue } from './common'

export function toReferentiallyEqual<T>(control: Control<T>, expected: T) {
  const smartEqComparisonResult = isEqual(control.actual, expected)
  const strictComparisonResult = Object.is(control.actual, expected)

  const additionalInfo =
    !strictComparisonResult && smartEqComparisonResult ? '. Did you mean to use `toEqual` instead?' : ''
  const reason = `${formatValue(control.actual)} is not ${formatValue(expected)}${additionalInfo}`
  const negatedReason = `${formatValue(control.actual)} is ${formatValue(expected)}`

  control.assert({
    success: strictComparisonResult,
    reason,
    negatedReason,
    actual: control.actual,
    expected,
  })
}
