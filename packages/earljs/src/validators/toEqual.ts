import { Control } from '../Control'
import { isEqual } from '../isEqual'
import { formatValue, replaceMatchersWithMatchedValues } from './common'

export function toEqual<T>(control: Control<T>, expected: T) {
  const reason = `${formatValue(control.actual)} not equal to ${formatValue(
    replaceMatchersWithMatchedValues(control.actual, expected),
  )}`
  const negatedReason = `${formatValue(control.actual)} equal to ${formatValue(
    replaceMatchersWithMatchedValues(control.actual, expected),
  )}`

  if (!isEqual(control.actual, expected)) {
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
