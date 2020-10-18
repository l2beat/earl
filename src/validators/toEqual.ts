import { Control, formatValue, replaceMatchersWithMatchedValues, smartEq } from './common'

export function toEqual<T>(control: Control<T>, expected: T) {
  const reason = `${formatValue(control.actual)} not equal to ${formatValue(expected)}`
  const negatedReason = `${formatValue(control.actual)} equal to ${formatValue(expected)}`

  if (!smartEq(control.actual, expected)) {
    control.assert({
      success: false,
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
