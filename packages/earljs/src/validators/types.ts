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
   * expect([1, { a: 2 }]).toEqual([1, { a: expect.a(Number) }]) // Usage with "a" matcher
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
   *
   * @example
   * ```ts
   * class A {
   *   a = 1
   * }
   *
   * // using toEqual requires matching prototypes
   * expect(new A()).not.toEqual({ a: 1 })
   * // toLooseEqual ignores prototypes and focuses only on the value
   * expect(new A()).toLooseEqual({ a: 1 })
   * ```
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
   *
   * @example
   * ```ts
   * const x = {}
   * expect(x).toReferentiallyEqual(x)
   * expect({}).not.toReferentiallyEqual(x)
   * expect(NaN).toReferentiallyEqual(NaN)
   * ```
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
   *
   * @example
   * ```ts
   * const doThrow = () => { throw new Error('oops, sorry') }
   *
   * expect(() => doThrow()).toThrow('oops')
   * expect(() => doThrow()).not.toThrow(expect.stringMatching(/end$/))
   * ```
   */
  toThrow(this: Expectation<() => any>, message: string): void
  /**
   * Calls the provided function and expects an error to be thrown. The error's
   * class and message are also checked.
   *
   * @param errorClass - expected class of the thrown error.
   * @param message - string or matcher to check the message against.
   *
   * @example
   * ```ts
   * const doThrow = () => {
   *   throw new Error('oops, sorry')
   * }
   *
   * expect(() => doThrow()).toThrow(Error, 'oops')
   * expect(() => doThrow()).not.toThrow(TypeError)
   * ```
   */
  toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void
  /**
   * Awaits the provided promise and expects it to be rejected.
   *
   * @example
   * ```ts
   * const promise = Promise.reject(new Error('oops, sorry'))
   *
   * await expect(promise).toBeRejected()
   * await expect(Promise.resolve()).not.toBeRejected()
   * ```
   */
  toBeRejected(this: Expectation<Promise<any>>): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The message
   * of the error is also checked.
   *
   * @param message - string or matcher to check the message against.
   * @example
   * ```ts
   * const promise = Promise.reject(new Error('oops, sorry'))
   *
   * await expect(promise).toBeRejected(Error, 'oops')
   * await expect(promise).not.toBeRejected(TypeError)
   * ```
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
   * @param clazz - type class or primitive constructor to match against.
   * @example
   * ```ts
   * expect(object).toBeA(MyClass) // checks if object is instance of `MyClass`, but not `Other`
   * expect(foo).toBeA(String) // checks if foo is instance of string
   * ```
   */
  toBeA(this: Expectation<T>, clazz: any): void
  /**
   * Checks if the value is an iterable containing all of the provided items.
   *
   * @param expectedItems - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
   * @example
   * ```ts
   * expect([1, 2, 3]).toBeAContainerWith(1, 2)
   * ```
   */
  toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]): void
  /**
   * Checks if the values is an array containing exactly given number of items.
   *
   * @param length - expected array length. Can be a matcher.
   * @example
   * ```ts
   * expect([1, 2, 3]).toBeAnArrayOfLength(3)
   * expect([1, 2, 3]).toBeAnArrayOfLength(expect.numberGreaterThanOrEqualTo(3)))
   * ```
   */
  toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number): void
  /**
   * Checks if the value is an array containing all of the provided items.
   *
   * @param expectedItems - values or matchers to look for in the matched array. Order of the items doesn't matter.
   * @example
   * ```ts
   * expect([1, 2, 3]).toBeAnArrayWith(1)
   * ```
   */
  toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>): void
  /**
   * Checks if the value is an object containing given key-value pairs.
   *
   * @param subset - an object to match against.
   *
   * @example
   * ```ts
   * expect({ a: 1, b: 2, c: 3 }).toBeAnObjectWith({ b: 2, a: 1 })
   * ```
   */
  toBeAnObjectWith(this: Expectation<Object>, subset: Object): void
  /**
   * Checks if the value is greater than the provided target.
   * @param target - number to check against.
   *
   * @example
   * ```ts
   * expect(2).toBeGreaterThan(1)
   * expect(1).not.toBeGreaterThan(1)
   * expect(-3).not.toBeGreaterThan(1)
   * ```
   */
  toBeGreaterThan(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is greater than or equal to the provided target.
   * @param target - number to check against.
   *
   * @example
   * ```ts
   * expect(2).toBeGreaterThanOrEqualTo(1)
   * expect(1).toBeGreaterThanOrEqualTo(1)
   * expect(-3).not.toBeGreaterThanOrEqualTo(1)
   * ```
   */
  toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is less than the provided target.
   * @param target - number to check against.
   *
   * @example
   * ```ts
   * expect(-3).toBeLessThan(1)
   * expect(1).not.toBeLessThan(1)
   * expect(2).not.toBeLessThan(1)
   * ```
   */
  toBeLessThan(this: Expectation<number>, target: number): void
  /**
   * Checks if the value is less than or equal the provided target.
   * @param target - number to check against.
   *
   * @example
   * ```ts
   * expect(-3).toBeLessThanOrEqualTo(1)
   * expect(1).toBeLessThanOrEqualTo(1)
   * expect(2).not.toBeLessThanOrEqualTo(1)
   * ```
   */
  toBeLessThanOrEqualTo(this: Expectation<number>, target: number): void

  /**
   * Checks if the value is truthy.
   * 
   * @example
   * ```ts
   * expect(1).toBeTruthy()
   * expect(false).not.toBeTruthy()
   * ```
   * 
   * There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. \
   * Everything else is truthy.
   */
  toBeTruthy(this: Expectation<unknown>): void

  /**
   * Checks if the value is falsy.
   * 
   * @example
   * ```ts
   * expect(0).toBeFalsy()
   * expect(true).not.toBeFalsy()
   * ```
   * 
   * There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. \
   * Everything else is truthy.
   */
  toBeFalsy(this: Expectation<unknown>): void

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
