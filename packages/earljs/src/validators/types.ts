import type { Expectation } from '../Expectation'
import type { Mock, MockArgs } from '../mocks/types'
import type { Newable } from '../types'

export interface Validators<T> {
  /**
   * Performs a recursive equality check. Objects are equal if their fields
   * are equal and they share the same prototype.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param value - value to check against.
   *
   * @example
   * ```ts
   * expect('foo').toEqual('foo') // Equality check against primitive value
   * ```
   *
   * @example
   *
   * ```ts
   * expect([1, { a: 2 }]).toEqual([1, { a: expect.a(Number) }]) // Usage with "a" matcher
   * ```
   *
   * @example
   *
   * ```ts
   * expect({ a: 2, b: 2 }).not.toEqual({ a: 2 }) // Negated equality check
   * ```
   */
  toEqual(value: T): void
  /**
   * Performs a recursive equality check. Objects are equal if their fields
   * are equal. Object prototypes are ignored.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param value - value to check against.
   */
  toLooseEqual(value: any): void
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
   * @param value - value to check against.
   */
  toReferentiallyEqual(this: Expectation<T>, value: T): void
  /**
   * Calls the provided function and expects an error to be thrown.
   */
  toThrow(this: Expectation<() => any>): void
  /**
   * Calls the provided function and expects an error to be thrown. The message
   * of the error is also checked.
   *
   * @param message - string or matcher to check the message against.
   */
  toThrow(this: Expectation<() => any>, message: string): void
  /**
   * Calls the provided function and expects an error to be thrown. The error's
   * class and message are also checked.
   *
   * @param errorClass - expected class of the thrown error.
   * @param message - string or matcher to check the message against.
   */
  toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void
  /**
   * Awaits the provided promise and expects it to be rejected.
   */
  toBeRejected(this: Expectation<Promise<any>>): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The message
   * of the error is also checked.
   *
   * @param message - string or matcher to check the message against.
   */
  toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The error's
   * class and message are also checked.
   *
   * @param errorClass - expected class of the thrown error.
   * @param message - string or matcher to check the message against.
   */
  toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>
  /**
   * Checks if the value is an instance of the provided class or primitive type. Examples:
   *
   * 1. `expect(object).toBeA(MyClass)` - checks if object is instance of `MyClass`, but not `Other`
   * 2. `expect(foo).toBeA(String)` - checks if foo is instance of string
   *
   * @param clazz - type class or primitive constructor to match against.
   */
  toBeA(this: Expectation<T>, clazz: any): void
  /**
   * Checks if the value is an iterable containing all of the provided items.
   *
   * @param expectedItems - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
   */
  toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]): void
  /**
   * Checks if the values is an array containing exactly given number of items.
   *
   * @param length - expected array length. Can be a matcher.
   */
  toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number): void
  /**
   * Checks if the value is an array containing all of the provided items.
   *
   * @param expectedItems - values or matchers to look for in the matched array. Order of the items doesn't matter.
   */
  toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>): void
  /**
   * Checks if the value is an object containing given key-value pairs.
   *
   * @param subset - an object to match against.
   */
  toBeAnObjectWith(this: Expectation<Object>, subset: Object): void
  /**
   * Checks if the value is greater than the provided target.
   * @param target - number to check against.
   */
  toBeGreaterThan(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is greater than or equal to the provided target.
   * @param target - number to check against.
   */
  toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is less than the provided target.
   * @param target - number to check against.
   */
  toBeLessThan(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is less than or equal the provided target.
   * @param target-  number to check against.
   */
  toBeLessThanOrEqualTo(this: Expectation<number>, target: number): void
  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  toBeExhausted(this: Expectation<Mock<any, any>>): void
  /**
   * Check if the mock has been called with the provided arguments.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args - an array of values or matchers to check the mock calls against.
   */
  toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>): void
  /**
   * Checks the entire history of mock calls.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args - an array where each item is an array of values or matchers to check the mock call against.
   */
  toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]): void
  /**
   * Checks that the value is the same as in the previous test execution.
   */
  toMatchSnapshot(this: Expectation<any>): void
}
