import { AssertionError } from './errors'

export interface ValidationResult {
  success: boolean
  hint?: string
  reason: string
  negatedReason: string
  actual?: string
  expected?: string
}

export interface ControlOptions {
  actual?: unknown
  isNegated?: boolean
}

export class Control {
  private readonly _location
  public readonly actual: unknown

  public isNegated = false

  constructor(options: ControlOptions) {
    this.actual = options.actual
    this.isNegated = options.isNegated ?? false

    this._location = AssertionError.getLocation()
  }

  get file() {
    return this._location.file
  }

  assert = (result: ValidationResult) => {
    if (this.isNegated === result.success) {
      throw new AssertionError({
        message: result.success ? result.negatedReason : result.reason,
        stack: this._location.stack,
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
      stack: this._location.stack,
      actual: result.actual,
      expected: result.expected,
    })
  }
}
