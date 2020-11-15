import { Control, formatValue, replaceMatchersWithMatchedValues } from './common'
import { smartEq } from './smartEq'

export function toEqual<T>(control: Control<T>, expected: T) {
  const reason = `${formatValue(control.actual)} not equal to ${formatValue(
    replaceMatchersWithMatchedValues(control.actual, expected),
  )}`
  const negatedReason = `${formatValue(control.actual)} equal to ${formatValue(
    replaceMatchersWithMatchedValues(control.actual, expected),
  )}`

  const comparisonResult = smartEq(control.actual, expected)

  if (comparisonResult.result === 'error') {
    control.assert({
      success: false,
      hint: comparisonResult.reason,
      reason,
      negatedReason,
      actual: control.actual,
      expected: replaceMatchersWithMatchedValues(control.actual, expected),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
      actual: control.actual,
      expected: replaceMatchersWithMatchedValues(control.actual, expected),
    })
  }
}
