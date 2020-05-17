import { assert } from 'ts-essentials'

import { Expectation, InternalExpectation } from '../Expectation'
import { ValidationResult } from './common'

// @todo: overloads like:
// .toThrow(/message/)
// .toThrow(ErrorClass)
// .toThrow(ErrorClass, 'message')
// .toThrow(ErrorClass, /message/)
// support for autofix with toThrow(AUTOFIX)
export function toThrow<T extends Function>(this: Expectation<T>, expectedMsg?: string): ValidationResult {
  const internalThis = (this as any) as InternalExpectation<T>
  assert(internalThis.actual instanceof Function, 'Actual has to be a function to check if threw')

  let error: any | undefined
  try {
    internalThis.actual()
  } catch (e) {
    error = e
  }

  if (expectedMsg !== undefined) {
    return {
      success: error?.message === expectedMsg,
      reason: `Expected to throw "${expectedMsg}" but didn't`,
      negatedReason: `Expected not to throw "${expectedMsg}" but did`,
    }
  } else {
    return {
      success: !!error,
      reason: `Expected to throw but didn't`,
      negatedReason: `Expected not to throw but threw ${error}`,
    }
  }
}
