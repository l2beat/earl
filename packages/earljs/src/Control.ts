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
  asyncResult?: {
    type: 'success' | 'error'
    value: unknown
  }
}

export class Control {
  private readonly _location
  private readonly _actual: unknown

  public isNegated = false
  public isAsync = false
  public receivedPromise = false
  public isAsyncSuccess = false
  public asyncError: unknown

  constructor(options: ControlOptions) {
    this._actual = options.actual
    this.isNegated = options.isNegated ?? false

    this.isAsync = options.asyncResult !== undefined

    if (this.isAsync && options.asyncResult?.value !== options.actual) {
      this.receivedPromise = true
    }

    if (options.asyncResult?.type === 'success') {
      this.isAsyncSuccess = true
      this._actual = options.asyncResult.value
      this.asyncError = undefined
    } else if (options.asyncResult?.type === 'error') {
      this._actual = undefined
      this.asyncError = options.asyncResult.value
    }

    this._location = AssertionError.getLocation(this.isAsync ? 3 : 4)
  }

  get actual() {
    if (this.isAsync && !this.isAsyncSuccess) {
      throw this.asyncError
    }
    return this._actual
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
