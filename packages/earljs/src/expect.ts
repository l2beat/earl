import { Expectation, ExpectationOptions } from './Expectation'
import {
  AMatcher,
  AnythingMatcher,
  ArrayWithMatcher,
  ContainerWithMatcher,
  NumberCloseToMatcher,
  NumberGreaterThanMatcher,
  NumberGreaterThanOrEqualToMatcher,
  NumberLessThanMatcher,
  NumberLessThanOrEqualToMatcher,
  StringMatchingMatcher,
} from './matchers'
import { ObjectWithMatcher } from './matchers/ObjectWith'
import { DynamicMatcher } from './plugins/types'

export interface ExpectInterface {
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringMatching: typeof StringMatchingMatcher.make
  numberCloseTo: typeof NumberCloseToMatcher.make
  containerWith: typeof ContainerWithMatcher.make
  arrayWith: typeof ArrayWithMatcher.make
  objectWith: typeof ObjectWithMatcher.make

  /**
   * Matches a number greater than target.
   * @param items number to compare to.
   */
  numberGreaterThan(target: number): number

  /**
   * Matches a number greater than or equal to target.
   * @param items number to compare to.
   */
  numberGreaterThanOrEqualTo(target: number): number

  /**
   * Matches a number less than target.
   * @param items number to compare to.
   */
  numberLessThan(target: number): number

  /**
   * Matches a number less than or equal to target.
   * @param items number to compare to.
   */
  numberLessThanOrEqualTo(target: number): number
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
expect.numberGreaterThan = NumberGreaterThanMatcher.make
expect.numberGreaterThanOrEqualTo = NumberGreaterThanOrEqualToMatcher.make
expect.numberLessThan = NumberLessThanMatcher.make
expect.numberLessThanOrEqualTo = NumberLessThanOrEqualToMatcher.make

// dynamically load new matchers and attach to expect object
// used by plugin loader
export function loadMatchers(matchers: Record<string, DynamicMatcher>) {
  for (const [name, matcher] of Object.entries(matchers)) {
    ;(expect as any)[name] = matcher
  }
}
