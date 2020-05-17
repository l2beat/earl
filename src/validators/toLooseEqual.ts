import { Expectation, InternalExpectation } from '../Expectation'
import { ValidationResult } from './common'
import { smartEq } from './toEqual'

/**
 * Like toEqual but without type checking.
 * @todo: follow design of jest's loose equal
 */
export function toLooseEqual<T>(this: Expectation<T>, expected?: any): ValidationResult {
  const internalThis = (this as any) as InternalExpectation<T>

  const reason = `${JSON.stringify(internalThis.actual)} not loose equal to ${JSON.stringify(expected)}`
  const negatedReason = `${JSON.stringify(internalThis.actual)} loose equal to ${JSON.stringify(expected)}`

  if (!smartEq(internalThis.actual, expected)) {
    if (arguments.length === 0 && !internalThis.isNegated) {
      internalThis.autofix('toLooseEqual', internalThis.actual)

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
