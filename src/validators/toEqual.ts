import { isEqualWith } from 'lodash'

import { Expectation, InternalExpectation } from '../Expectation'
import { Matcher } from '../matchers/Base'
import { ValidationResult } from './common'

/**
 * Does deep "smart" equality check
 */
export function toEqual<T>(this: Expectation<T>, expected?: T): ValidationResult {
  const internalThis = (this as any) as InternalExpectation<T>

  const reason = `${JSON.stringify(internalThis.actual)} not equal to ${JSON.stringify(expected)}`
  const negatedReason = `${JSON.stringify(internalThis.actual)} equal to ${JSON.stringify(expected)}`

  if (!smartEq(internalThis.actual, expected)) {
    if (arguments.length === 0 && !internalThis.isNegated) {
      internalThis.autofix('toEqual', internalThis.actual)

      return {
        success: true,
        reason,
        negatedReason,
      }
    } else {
      return {
        success: false,
        reason,
        negatedReason,
      }
    }
  } else {
    return {
      success: true,
      reason,
      negatedReason,
    }
  }
}

export function smartEq(actual: any, expected: any): boolean {
  return isEqualWith(actual, expected, (a: any, b: any) => {
    if (b instanceof Matcher) {
      return b.check(a)
    }
  })
}
