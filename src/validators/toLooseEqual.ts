import { Control } from './common'
import { smartEq } from './toEqual'

// @todo: follow design of jest's loose equal
export function toLooseEqual(control: Control<any>, expected?: any) {
  const reason = `${JSON.stringify(control.actual)} not loose equal to ${JSON.stringify(expected)}`
  const negatedReason = `${JSON.stringify(control.actual)} loose equal to ${JSON.stringify(expected)}`

  if (!smartEq(control.actual, expected)) {
    if (arguments.length === 1 && !control.isNegated) {
      control.autofix('toLooseEqual', control.actual)
      control.assert({
        success: true,
        reason,
        negatedReason,
      })
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
