import { Expectation, ExpectationOptions } from './Expectation'
import {
  AMatcher,
  AnythingMatcher,
  ArrayWithMatcher,
  ContainerWithMatcher,
  NumberCloseToMatcher,
  StringMatchingMatcher,
} from './matchers'
import { ObjectWithMatcher } from './matchers/ObjectWith'
import { DynamicMatcher } from './plugins/types'
import { Class2Primitive, NewableOrPrimitive } from './types'

export interface ExpectInterface {
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>

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
   * @param type class or primitive constructor to match against.
   */
  a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>

  /**
   * Matches strings that contain the provided substring.
   *
   * @param substring a string to look for in the matched values.
   */
  stringMatching(substring: string): string

  /**
   * Matches strings that conform to the provided pattern.
   *
   * @param pattern a regexp to test the matched values.
   */
  stringMatching(pattern: RegExp): string

  /**
   * Matches numbers that are close to the target value. The options are used
   * to specify the maximum difference.
   *
   * The range is [expected - delta, expected + delta] (inclusive).
   *
   * @param target a number to aim for.
   * @param options an object with the delta parameter, denoting the maximum difference between the values.
   */
  numberCloseTo(target: number, options: { delta: number }): number

  /**
   * Matches an iterable containing the provided items.
   *
   * @param items values or matchers to look for in the matched iterable.
   */
  containerWith(...items: any[]): any

  /**
   * Matches an array containing the provided items.
   *
   * @param items values or matchers to look for in the matched array.
   */
  arrayWith<T>(...items: T[]): T[]

  /**
   * Matches an object containing given key-value pairs.
   *
   * @param subset an object to match against.
   */
  objectWith(subset: Object): any
}

export const expect: ExpectInterface = <T>(actual: T, options: ExpectationOptions = {}): Expectation<T> => {
  return new Expectation(actual, false, options)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseToMatcher.make
expect.containerWith = ContainerWithMatcher.make
expect.arrayWith = ArrayWithMatcher.make
expect.objectWith = ObjectWithMatcher.make

// dynamically load new matchers and attach to expect object
// used by plugin loader
export function loadMatchers(matchers: Record<string, DynamicMatcher>) {
  for (const [name, matcher] of Object.entries(matchers)) {
    ;(expect as any)[name] = matcher
  }
}
