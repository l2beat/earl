import { AssertionError } from './errors'
import { getTestRunnerIntegration } from './testRunnerCtx'
import { ValidationResult } from './validators/common'

export class Control<T> {
  public testRunnerCtx = getTestRunnerIntegration()
  private stack = AssertionError.getCleanStack()

  constructor(public actual: T, public isNegated: boolean, private extraMessage?: string) {}

  assert = (result: ValidationResult) => {
    if (this.isNegated === result.success) {
      throw new AssertionError({
        message: result.success ? result.negatedReason : result.reason,
        stack: this.stack,
        actual: result.actual,
        expected: result.expected,
        extraMessage: this.extraMessage,
        hint: result.hint,
      })
    }
  }

  fail = (result: Omit<ValidationResult, 'success' | 'negatedReason'>): never => {
    throw new AssertionError({
      message: result.reason,
      stack: this.stack,
      actual: result.actual,
      expected: result.expected,
      extraMessage: this.extraMessage,
      hint: result.hint,
    })
  }
}
