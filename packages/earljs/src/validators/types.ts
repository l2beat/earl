/* eslint-disable @typescript-eslint/no-explicit-any */

import { UnionToIntersection } from 'ts-essentials'

import type { Expectation } from '../Expectation'
import type { ExpectedEqual } from '../isEqual/rules'
import type { Mock, MockArgs } from '../mocks/types'
import type { Newable, NewableOrPrimitive } from '../types'
import type { TestContext } from './snapshots/TestContext'

// registry for validators added by plugins
export interface Validators {
  // (this: Expectation<number>, expected: number) => void
}

export type ValidatorsFor<T> = __ValidatorsFor<Values<AllValidators<T>>, T>

// Distributes validators uniob and filters
export type __ValidatorsFor<TValidators, TActual> = UnionToIntersection<
  TValidators extends [infer A, infer Matchers]
    ? TActual extends A
      ? Matchers
      : // if TActual is exactly `unknown`, we'll allow all matchers for convenience when user calls `expect()` without argument and tests autocomplete.
      unknown extends TActual
      ? Matchers
      : never
    : never
> & {
  // validators from plugins
  [P in keyof Validators]: Validators[P] extends (this: Expectation<infer A>, ...args: infer Args) => void
    ? TActual extends A
      ? (...args: Args) => void
      : unknown extends TActual
      ? (...args: Args) => void
      : never
    : never
}

export type Values<T> = T[keyof T & number]
export type ItemOfIterable<T> = Extract<T, Iterable<any>> extends Iterable<infer R> ? R : never

// @todo should we extract a type from __Validators of and use it here, turning it into a big intersection type?
// We could do without UnionToIntersection then I guess...
export type AllValidators<T> = [
  [unknown, CommonValidators<T>],
  [Mock<any[], any>, MockValidators<T>],
  [number, NumberValidators],
  [object, ObjectValidators],
  [any[], ArrayValidators],
  [Iterable<any>, IterableValidators<ItemOfIterable<T>>],
  [Promise<unknown>, PromiseValidators],
  [() => any, FunctionValidators],
]

export interface CommonValidators<T> extends BooleanValidators, OptionalValidators {
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
  toEqual(value: ExpectedEqual<T>): void
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
  toReferentiallyEqual(value: T): void
  /**
   * Checks if the value is an instance of a provided class or a primitive type. Works as expected with builtin types like strings, numbers, dates.
   *
   * 1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
   * 2. `expect.a(String)` - matches `"foo"`, but not `123`
   *
   * @param clazz - type class or primitive constructor to match against.
   * @example
   * ```ts
   * expect(object).toBeA(MyClass) // checks if object is instance of `MyClass`, but not `Other`
   * expect(foo).toBeA(String) // checks if foo is instance of string
   * expect(foo).toBeA(Object) // matches any object (not null)
   * ```
   */
  toBeA(clazz: NewableOrPrimitive): void
  /**
   * Checks that the value is the same as in the previous test execution.
   */
  toMatchSnapshot(context: TestContext): void
}

export interface FunctionValidators {
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
  toThrow(message?: string): void
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
  toThrow(errorClass: Newable<Error>, message?: string): void
}

export interface NumberValidators {
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
  toBeGreaterThan(target: number): void
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
  toBeGreaterThanOrEqualTo(target: number): void
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
  toBeLessThan(target: number): void
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
  toBeLessThanOrEqualTo(target: number): void
}

export interface BooleanValidators {
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
  toBeTruthy(): void
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
  toBeFalsy(): void
}

export interface OptionalValidators {
  /**
   * Checks if the value is different to `undefined` and `null`.
   *
   * @example
   * ```ts
   * expect(0).toBeDefined()
   * expect(null).not.toBeDefined()
   * ```
   */
  toBeDefined(): void
  /**
   * Checks if the value is `undefined` or `null`.
   *
   * @example
   * ```ts
   * expect(undefined).toBeNullish()
   * expect(false).not.toBeNullish()
   * ```
   */
  toBeNullish(): void
}

export interface PromiseValidators {
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
  toBeRejected(message?: string): Promise<void>
  /**
   * Awaits the provided promise and expects it to be rejected. The error's
   * class and message are also checked.
   *
   * @param errorClass - expected class of the thrown error.
   * @param message - string or matcher to check the message against.
   */
  toBeRejected(errorClass: Newable<Error>, message?: string): Promise<void>
}

export interface MockValidators<T> {
  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  toBeExhausted(): void
  /**
   * Check if the mock has been called with the provided arguments.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args - an array of values or matchers to check the mock calls against.
   */
  toHaveBeenCalledWith(args: MockArgs<T>): void
  /**
   * Checks the entire history of mock calls.
   *
   * You can use matchers in place of a value. When a matcher is encountered its
   * internal rules are used instead of the usual checks.
   *
   * @param args - an array where each item is an array of values or matchers to check the mock call against.
   */
  toHaveBeenCalledExactlyWith(args: MockArgs<T>[]): void
}

export interface ObjectValidators {
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
  toBeAnObjectWith(subset: object): void
}

export interface ArrayValidators {
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
  toBeAnArrayOfLength(length: number): void
  /**
   * Checks if the value is an array containing all of the provided items. Each expected item must be matched uniquely.
   *
   * @param expectedItems - values or matchers to look for in the matched array. Order of the items doesn't matter.
   * @example
   * ```ts
   * expect([1, 2, 3]).toBeAnArrayWith(1)
   * expect([1]).toBeAnArrayWith(1, 1) // throws b/c a second "1" is missing
   * ```
   */
  toBeAnArrayWith(...expectedItems: readonly any[]): void
}

export interface IterableValidators<T> {
  /**
   * Checks if the value is an iterable containing all of the provided items. Internally, container is first turned into array and `toBeAnArrayWith` is used for final comparison.
   *
   * @param expectedItems - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
   * @example
   * ```ts
   * expect([1, 2, 3]).toBeAContainerWith(1, 2)
   * ```
   */
  toBeAContainerWith(...expectedItems: T[]): void
}
