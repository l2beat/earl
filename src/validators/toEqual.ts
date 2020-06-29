import { isEqualWith } from 'lodash'

import { Matcher } from '../matchers/Base'
import { Control, formatValue } from './common'

export function toEqual<T>(control: Control<T>, expected?: T) {
  const reason = `${formatValue(control.actual)} not equal to ${formatValue(expected)}`
  const negatedReason = `${formatValue(control.actual)} equal to ${formatValue(expected)}`

  if (!smartEq(control.actual, expected)) {
    if (arguments.length === 1 && !control.isNegated) {
      control.autofix('toEqual', control.actual)
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

export function smartEq(actual: any, expected: any): boolean {
  return isEqualWith(actual, expected, (a: any, b: any) => {
    if (b instanceof Matcher) {
      return b.check(a)
    }
  })
}
