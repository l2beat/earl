import { AssertionError } from './AssertionError'
import { AnythingMatcher } from './matchers/Anything'
import { LooseMock } from './mocks/looseMock'
import { StrictMock } from './mocks/strictMock'
import { Control, ValidationResult } from './validators/common'
import { toBeExhausted, toHaveBeenCalledWith } from './validators/mocks'
import { toBeRejected } from './validators/toBeRejected'
import { toEqual } from './validators/toEqual'
import { toLooseEqual } from './validators/toLooseEqual'
import { toThrow } from './validators/toThrow'

export interface ExpectationOptions {
  extraMessage?: string
}

export class Expectation<T> {
  constructor(
    private readonly actual: T,
    private isNegated: boolean = false,
    private options: ExpectationOptions = {},
  ) {}

  // modifiers
  get not(): this {
    if (this.isNegated) {
      throw new Error('Tried negating already negated expectation')
    }

    this.isNegated = true

    return this
  }

  // validators

  /** Does deep "smart" equality check. */
  toEqual(value: T): void {
    toEqual(this.getControl(), value)
  }

  /** Like toEqual but without type checking. */
  toLooseEqual(value: any): void {
    toLooseEqual(this.getControl(), value)
  }

  toThrow(this: Expectation<() => any>, expected: any = AnythingMatcher.make()): void {
    toThrow(this.getControl(), expected)
  }

  toBeRejected(this: Expectation<Promise<any>>, expected: any): Promise<void> {
    return toBeRejected(this.getControl(), expected)
  }

  // mocks

  toBeExhausted(this: Expectation<StrictMock<any, any>>) {
    return toBeExhausted(this.getControl())
  }

  toHaveBeenCalledWith(this: Expectation<LooseMock<any[], any>>, expectedCall: any[]) {
    return toHaveBeenCalledWith(this.getControl(), expectedCall)
  }

  // utils

  private getControl(): Control<T> {
    return {
      actual: this.actual,
      assert: this.assert.bind(this),
      isNegated: this.isNegated,
    }
  }

  private assert(result: ValidationResult) {
    if (this.isNegated) {
      if (result.success) {
        throw new AssertionError({
          message: result.negatedReason,
          actual: result.actual,
          expected: result.expected,
          extraMessage: this.options.extraMessage,
        })
      }
    } else {
      if (!result.success) {
        throw new AssertionError({
          message: result.reason,
          actual: result.actual,
          expected: result.expected,
          extraMessage: this.options.extraMessage,
        })
      }
    }
  }
}
