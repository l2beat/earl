import { Control } from './Control'
import { AnythingMatcher } from './matchers/Anything'
import { ErrorMatcher } from './matchers/Error'
import { Mock, MockArgs } from './mocks'
import { DynamicValidator } from './plugins/types'
import { Newable } from './types'
import { toBeAContainerWith } from './validators/dataStructures'
import { toBeExhausted, toHaveBeenCalledExactlyWith, toHaveBeenCalledWith } from './validators/mocks'
import { toBeGreaterThan, toBeGreaterThanOrEqualTo, toBeLessThan, toBeLessThanOrEqualTo } from './validators/numbers'
import { toMatchSnapshot } from './validators/snapshots/toMatchSnapshot'
import { toBeA } from './validators/toBeA'
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

  /**
   * Inverts the behaviour of the validator that follows.
   */
  get not(): this {
    if (this.isNegated) {
      throw new Error('Tried negating an already negated expectation')
    }

    this.isNegated = true

    return this
  }

  // validators

  /**
   * Performs a recursive equality check. Objects are equal if their fields
   * are equal and they share the same prototype.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param value value to check against.
   */
  toEqual(value: T): void {
    toEqual(this.getControl(), value)
  }

  /**
   * Performs a recursive equality check. Objects are equal if their fields
   * are equal. Object prototypes are ignored.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param value value to check against.
   */
  toLooseEqual(value: any): void {
    toLooseEqual(this.getControl(), value)
  }

  /**
   * Performs a referential equality check using `Object.is`. It is similar to
   * `===`, with two differences:
   *
   * 1. `Object.is(-0, +0)` returns `false`
   * 2. `Object.is(NaN, NaN)` returns `true`
   *
   * This function should be used if you care about object identity rather than
   * deep equality.
   *
   * @param value value to check against.
   */
  toReferentiallyEqual(this: Expectation<T>, value: T): void {
    toReferentiallyEqual(this.getControl(), value as any)
  }

  /**
   * Calls the provided function and expects an error to be thrown.
   */
  toThrow(this: Expectation<() => any>): void
  /**
   * Calls the provided function and expects an error to be thrown. The message
   * of the error is also checked.
   *
   * @param message string or matcher to check the message against.
   */
  toThrow(this: Expectation<() => any>, message: string): void
  /**
   * Calls the provided function and expects an error to be thrown. The error's
   * class and message are also checked.
   *
   * @param errorClass expected class of the thrown error.
   * @param message string or matcher to check the message against.
   */
  toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void
  toThrow(this: Expectation<() => any>, classOrMessage?: string | Newable<Error>, message?: string): void {
    if (arguments.length === 0) {
      toThrow(this.getControl(), AnythingMatcher.make())
    } else {
      toThrow(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  /**
   * Awaits the provided promise and expects it to be rejected.
   */
  toBeRejected(this: Expectation<Promise<any>>): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The message
   * of the error is also checked.
   *
   * @param message string or matcher to check the message against.
   */
  toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The error's
   * class and message are also checked.
   *
   * @param errorClass expected class of the thrown error.
   * @param message string or matcher to check the message against.
   */
  toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>
  toBeRejected(
    this: Expectation<Promise<any>>,
    classOrMessage?: string | Newable<Error>,
    message?: string,
  ): Promise<void> {
    if (arguments.length === 0) {
      return toBeRejected(this.getControl(), AnythingMatcher.make())
    } else {
      return toBeRejected(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  /**
   * Checks if the value is an instance of the provided class or primitive type. Examples:
   *
   * 1. `expect(object).toBeA(MyClass)` - checks if object is instance of `MyClass`, but not `Other`
   * 2. `expect(foo).toBeA(String)` - checks if foo is instance of string
   *
   * @param clazz type class or primitive constructor to match against.
   */
  toBeA(this: Expectation<T>, clazz: any) {
    return toBeA(this.getControl(), clazz)
  }

  /**
   * Checks if the value is an iterable containing the provided items.
   *
   * @param expectedItems values or matchers to look for in the matched iterable.
   */
  toBeAContainerWith(this: Expectation<T>, ...expectedItems: any[]) {
    return toBeAContainerWith(this.getControl(), expectedItems)
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

  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  toBeExhausted(this: Expectation<Mock<any, any>>) {
    return toBeExhausted(this.getControl())
  }

  /**
   * Check if the mock has been called with the provided arguments.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args an array of values or matchers to check the mock calls against.
   */
  toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>) {
    return toHaveBeenCalledWith(this.getControl(), args)
  }

  /**
   * Checks the entire history of mock calls.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args an array where each item is an array of values or matchers to check the mock call against.
   */
  toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]) {
    return toHaveBeenCalledExactlyWith(this.getControl(), args)
  }

  /**
   * Checks that the value is the same as in the previous test execution.
   */
  toMatchSnapshot(this: Expectation<any>): void {
    toMatchSnapshot(this.getControl())
  }

  // utilities

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
