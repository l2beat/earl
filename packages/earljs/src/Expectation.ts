import { Control } from './Control'
import { AnythingMatcher } from './matchers/Anything'
import { ErrorMatcher } from './matchers/Error'
import { Mock, MockArgs } from './mocks'
import { DynamicValidator } from './plugins/types'
import { Newable } from './types'
import { toBeExhausted, toHaveBeenCalledExactlyWith, toHaveBeenCalledWith } from './validators/mocks'
import { toBeGreaterThan, toBeGreaterThanOrEqualTo, toBeLessThan, toBeLessThanOrEqualTo } from './validators/numbers'
import { toMatchSnapshot } from './validators/snapshots/toMatchSnapshot'
import { toBeRejected } from './validators/toBeRejected'
import { toEqual } from './validators/toEqual'
import { toLooseEqual } from './validators/toLooseEqual'
import { toReferentiallyEqual } from './validators/toReferentiallyEqual'
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

  /** Checks referential equality */
  toReferentiallyEqual(this: Expectation<T>, value: T): void {
    toReferentiallyEqual(this.getControl(), value as any)
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

  /**
   * Checks if the value is greater than the provided target.
   * @param target number to check against.
   */
  toBeGreaterThan(this: Expectation<number>, target: number) {
    return toBeGreaterThan(this.getControl(), target)
  }

  /**
   * Checks if the value is greater than or equal to the provided target.
   * @param target number to check against.
   */
  toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number) {
    return toBeGreaterThanOrEqualTo(this.getControl(), target)
  }

  /**
   * Checks if the value is less than the provided target.
   * @param target number to check against.
   */
  toBeLessThan(this: Expectation<number>, target: number) {
    return toBeLessThan(this.getControl(), target)
  }

  /**
   * Checks if the value is less than or equal the provided target.
   * @param target number to check against.
   */
  toBeLessThanOrEqualTo(this: Expectation<number>, target: number) {
    return toBeLessThanOrEqualTo(this.getControl(), target)
  }

  // mocks

  toBeExhausted(this: Expectation<Mock<any, any>>) {
    return toBeExhausted(this.getControl())
  }

  toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, expectedCall: MockArgs<T>) {
    return toHaveBeenCalledWith(this.getControl(), expectedCall)
  }

  toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, expectedCalls: MockArgs<T>[]) {
    return toHaveBeenCalledExactlyWith(this.getControl(), expectedCalls)
  }

  toMatchSnapshot(this: Expectation<any>): void {
    toMatchSnapshot(this.getControl())
  }

  private getControl(): Control<T> {
    return new Control(this.actual, this.isNegated, this.options.extraMessage)
  }
}

const dynamicValidators: Record<string, DynamicValidator<any>> = {}
export function loadValidators(validators: Record<string, DynamicValidator<any>>) {
  for (const [name, validator] of Object.entries(validators)) {
    dynamicValidators[name] = validator
  }
}

export function getControl<T>(expectation: Expectation<T>): Control<T> {
  return expectation['getControl']()
}
