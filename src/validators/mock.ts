import { Expectation, InternalExpectation } from '../Expectation'
import { LooseMock } from '../mocks/looseMock'
import { StrictMock } from '../mocks/strictMock'
import { ValidationResult } from './common'

export function toBeExhausted<T extends StrictMock<any, any> | LooseMock<any, any>>(
  this: Expectation<T>,
): ValidationResult {
  const internalThis = (this as any) as InternalExpectation<T>

  const reason = 'Mock not exhausted!'
  const negatedReason = 'Mock exhausted!'

  return {
    success: internalThis.actual.isExhausted(),
    reason,
    negatedReason,
  }
}
