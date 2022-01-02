import { Control } from '../Control'
import { isEqual, LOOSE_EQUALITY_OPTIONS } from '../isEqual'
import { formatValue, replaceMatchersWithMatchedValues } from './common'

// @todo: follow design of jest's loose equal
export function toLooseEqual(control: Control<any>, expected: any) {
  const reason = `${formatValue(control.actual)} not loose equal to ${formatValue(expected)}`
  const negatedReason = `${formatValue(control.actual)} loose equal to ${formatValue(expected)}`

  if (!isEqual(control.actual, expected, LOOSE_EQUALITY_OPTIONS)) {
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
