import { AssertionError } from './errors'
import { AnythingMatcher } from './matchers/Anything'
import { ErrorMatcher } from './matchers/Error'
import { Mock, MockArgs } from './mocks'
import { DynamicValidator } from './plugins/types'
import { TestRunnerCtx } from './test-runners/TestRunnerCtx'
import { Newable } from './types'
import { Control, ValidationResult } from './validators/common'
import { toBeExhausted, toHaveBeenCalledExactlyWith, toHaveBeenCalledWith } from './validators/mocks'
import { toMatchSnapshot } from './validators/snapshots/toMatchSnapshot'
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
  ) {
    for (const [name, validator] of Object.entries(dynamicValidators)) {
      ;(this as any)[name] = validator
    }
  }

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

  toThrow(this: Expectation<() => any>): void
  toThrow(this: Expectation<() => any>, expectedMsg: string): void
  toThrow(this: Expectation<() => any>, errorCls: Newable<Error>, expectedMsg?: string): void
  toThrow(this: Expectation<() => any>, errorClsOrExpectedMsg?: string | Newable<Error>, expectedMsg?: string): void {
    if (arguments.length === 0) {
      toThrow(this.getControl(), AnythingMatcher.make())
    } else {
      toThrow(this.getControl(), ErrorMatcher.make(errorClsOrExpectedMsg as any, expectedMsg))
    }
  }

  toBeRejected(this: Expectation<Promise<any>>): Promise<void>
  toBeRejected(this: Expectation<Promise<any>>, expectedMsg: string): Promise<void>
  toBeRejected(this: Expectation<Promise<any>>, errorCls: Newable<Error>, expectedMsg?: string): Promise<void>
  toBeRejected(
    this: Expectation<Promise<any>>,
    errorClsOrExpectedMsg?: string | Newable<Error>,
    expectedMsg?: string,
  ): Promise<void> {
    if (arguments.length === 0) {
      return toBeRejected(this.getControl(), AnythingMatcher.make())
    } else {
      return toBeRejected(this.getControl(), ErrorMatcher.make(errorClsOrExpectedMsg as any, expectedMsg))
    }
  }

  // mocks

  toBeExhausted(this: Expectation<Mock<any, any>>) {
    return toBeExhausted(this.getControl())
  }

  toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, expectedCall: MockArgs<T>) {
    return toHaveBeenCalledWith(this.getControl(), expectedCall)
  }

  toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, expectedCalls: MockArgs<T>) {
    return toHaveBeenCalledExactlyWith(this.getControl(), expectedCalls)
  }

  toMatchSnapshot(this: Expectation<any>): void {
    toMatchSnapshot(this.getControl())
  }

  // utils

  private getControl(): Control<T> {
    return {
      actual: this.actual,
      assert: this.assert.bind(this),
      isNegated: this.isNegated,
      testRunnerCtx,
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
          hint: result.hint,
        })
      }
    } else {
      if (!result.success) {
        throw new AssertionError({
          message: result.reason,
          actual: result.actual,
          expected: result.expected,
          extraMessage: this.options.extraMessage,
          hint: result.hint,
        })
      }
    }
  }
}

const dynamicValidators: Record<string, DynamicValidator<any>> = {}
export function loadValidators(validators: Record<string, DynamicValidator<any>>) {
  for (const [name, validator] of Object.entries(validators)) {
    dynamicValidators[name] = validator
  }
}

let testRunnerCtx: TestRunnerCtx | undefined
export function setTestRunnerIntegration(_testRunnerCtx: TestRunnerCtx) {
  testRunnerCtx = _testRunnerCtx
}
