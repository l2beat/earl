import { Class2Primitive, NewableOrPrimitive } from '../types'

export interface Matchers {
  /**
   * Matches any value.
   */
  anything(): any

  /**
   * Matches an instance of the provided class or primitive type. Examples:
   *
   * 1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
   * 2. `expect.a(String)` - matches `"foo"`, but not `123`
   *
   * @param type - class or primitive constructor to match against.
   *
   * @example
   * ```ts
   * expect(something).toEqual(expect.a(String)) // matches any string
   * expect(something).toEqual(expect.a(Object)) // matches any object (not null)
   * ```
   */
  a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>

  /**
   * Matches strings that contain the provided substring.
   *
   * @param substring - a string to look for in the matched values.
   */
  stringMatching(substring: string): string

  /**
   * Matches strings that conform to the provided pattern.
   *
   * @param pattern - a regexp to test the matched values.
   */
  stringMatching(pattern: RegExp): string

  /**
   * Matches numbers that are close to the target value. The options are used
   * to specify the maximum difference.
   *
   * The range is [expected - delta, expected + delta] (inclusive).
   *
   * @param target - a number to aim for.
   * @param options - an object with the delta parameter, denoting the maximum difference between the values.
   */
  numberCloseTo(target: number, options: NumberCloseToDelta): number

  /**
   * Matches an iterable containing the provided items.
   *
   * @param items - values or matchers to look for in the matched iterable.
   */
  containerWith(...items: any[]): any

  /**
   * Matches an array containing exactly given number of items.
   *
   * @param length - expected array length. Can be a matcher.
   */
  arrayOfLength<T>(length: number): T[]

  /**
   * Matches an array containing the provided items.
   *
   * @param items - values or matchers to look for in the matched array.
   */
  arrayWith<T>(...items: T[]): T[]

  /**
   * Matches an object containing given key-value pairs.
   *
   * @param subset - an object to match against.
   */
  objectWith(subset: Object): any

  /**
   * Matches a number greater than target.
   * @param items - number to compare to.
   */
  numberGreaterThan(target: number): number

  /**
   * Matches a number greater than or equal to target.
   * @param items - number to compare to.
   *
   * @example
   * ```ts
   * expect({ a: 2 }).toEqual({
   *   a: expect.numberGreaterThanOrEqualTo(1),
   * })
   * expect({ b: 2 }).toEqual({
   *   b: expect.numberGreaterThanOrEqualTo(2),
   * })
   * expect({ c: 2 }).not.toEqual({
   *   c: expect.numberGreaterThanOrEqualTo(3),
   * })
   * ```
   */
  numberGreaterThanOrEqualTo(target: number): number

  /**
   * Matches a number less than target.
   * @param items - number to compare to.
   *
   * @example
   * ```ts
   * expect({ a: 2 }).toEqual({ a: expect.numberLessThan(3) })
   * expect({ b: 2 }).not.toEqual({ b: expect.numberLessThan(2) })
   * expect({ c: 2 }).not.toEqual({ c: expect.numberLessThan(1) })
   * ```
   */
  numberLessThan(target: number): number

  /**
   * Matches a number less than or equal to target.
   * @param items - number to compare to.
   *
   * @example
   * ```ts
   * expect({ a: 2 }).toEqual({
   *   a: expect.numberLessThanOrEqualTo(3),
   * })
   * expect({ b: 2 }).toEqual({
   *   b: expect.numberLessThanOrEqualTo(2),
   * })
   * expect({ c: 2 }).not.toEqual({
   *   c: expect.numberLessThanOrEqualTo(1),
   * })
   * ```
   */
  numberLessThanOrEqualTo(target: number): number

  /**
   * Matches any value that is not `null` or `undefined`.
   *
   * @example
   * ```ts
   * expect({ a: 0 }).toEqual({ a: expect.defined() })
   * expect({ a: null }).not.toEqual({ a: expect.defined() })
   * ```
   */
  defined(): any

  /**
   * Matches `null` and `undefined`
   *
   * @example
   * ```ts
   * expect({ a: undefined }).toEqual({ a: expect.nullish() })
   * expect([null]).toEqual([expect.nullish()])
   * ```
   */
  nullish(): any

  /**
   * Matches any truthy value.
   *
   * @example
   * ```ts
   * expect({ a: 1 }).toEqual({ a: expect.truthy() })
   * expect([false]).not.toEqual([expect.truthy()])
   * ```
   *
   * There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. \
   * Everything else is truthy.
   */
  truthy(): any

  /**
   * Matches any falsy value.
   *
   * @example
   * ```ts
   * expect({ a: 0 }).toEqual({ a: expect.falsy() })
   * expect([true]).not.toEqual([expect.falsy()])
   * ```
   *
   * There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. \
   * Everything else is truthy.
   */
  falsy(): any
}

export interface NumberCloseToDelta {
  delta: number
}
