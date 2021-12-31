import { AssertionError } from './errors'
import { getTestRunnerIntegration } from './testRunnerCtx'
import { ValidationResult } from './validators/common'

export class Control<T> {
  public testRunnerCtx = getTestRunnerIntegration()
  private error = new AssertionError()

  constructor(public actual: T, public isNegated: boolean, private extraMessage?: string) {}

  assert = (result: ValidationResult) => {
    if (this.isNegated === result.success) {
      this.error.update({
        message: result.success ? result.negatedReason : result.reason,
        actual: result.actual,
        expected: result.expected,
        extraMessage: this.extraMessage,
        hint: result.hint,
      })
      throw this.error
    }
  }

  fail = (result: Omit<ValidationResult, 'success' | 'negatedReason'>): never => {
    this.error.update({
      message: result.reason,
      actual: result.actual,
      expected: result.expected,
      extraMessage: this.extraMessage,
      hint: result.hint,
    })
    throw this.error
  }
}
