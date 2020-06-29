import { Control, formatValue } from './common'
import { smartEq } from './toEqual'

// @todo: follow design of jest's loose equal
export function toLooseEqual(control: Control<any>, expected?: any) {
  const reason = `${formatValue(control.actual)} not loose equal to ${formatValue(expected)}`
  const negatedReason = `${formatValue(control.actual)} loose equal to ${formatValue(expected)}`

  if (!smartEq(control.actual, expected)) {
    if (arguments.length === 1 && !control.isNegated) {
      control.autofix('toLooseEqual', control.actual)
    } else {
      control.assert({
        success: false,
        reason,
        negatedReason,
      })
    }
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
    })
  }
}
