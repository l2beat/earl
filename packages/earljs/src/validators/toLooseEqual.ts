import { Control } from '../Control'
import { formatValue, replaceMatchersWithMatchedValues } from './common'
import { smartEq } from './smartEq'

// @todo: follow design of jest's loose equal
export function toLooseEqual(control: Control<any>, expected: any) {
  const reason = `${formatValue(control.actual)} not loose equal to ${formatValue(expected)}`
  const negatedReason = `${formatValue(control.actual)} loose equal to ${formatValue(expected)}`

  const comparisonResult = smartEq(control.actual, expected, false)

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
