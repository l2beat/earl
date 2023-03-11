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
  private readonly location = AssertionError.getLocation()

  constructor(public actual: T, public isNegated: boolean) {}

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
      })
    }
  }

  fail = (
    result: Omit<ValidationResult, 'success' | 'negatedReason'>,
  ): never => {
    throw new AssertionError({
      message: result.reason,
      stack: this.location.stack,
      actual: result.actual,
      expected: result.expected,
    })
  }
}
