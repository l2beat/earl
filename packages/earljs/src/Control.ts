import { AssertionError } from './errors'

export interface ValidationResult {
  success: boolean
  hint?: string
  reason: string
  negatedReason: string
  actual?: string
  expected?: string
}

export class Control<T> {
  private location = AssertionError.getLocation()

  constructor(public actual: T, public isNegated: boolean, private extraMessage?: string) {}

  get file() {
    return this.location.file
  }

  assert = (result: ValidationResult) => {
    if (this.isNegated === result.success) {
      throw new AssertionError({
        message: result.success ? result.negatedReason : result.reason,
        stack: this.location.stack,
        actual: result.actual,
        expected: result.expected,
        extraMessage: this.extraMessage,
      })
    }
  }

  fail = (result: Omit<ValidationResult, 'success' | 'negatedReason'>): never => {
    throw new AssertionError({
      message: result.reason,
      stack: this.location.stack,
      actual: result.actual,
      expected: result.expected,
      extraMessage: this.extraMessage,
    })
  }
}
