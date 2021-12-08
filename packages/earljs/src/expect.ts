import { Expectation, ExpectationOptions } from './Expectation'
import {
  AMatcher,
  AnythingMatcher,
  ArrayWithMatcher,
  ContainerWithMatcher,
  DefinedMatcher,
  FalsyMatcher,
  NullishMatcher,
  NumberCloseToMatcher,
  NumberGreaterThanMatcher,
  NumberGreaterThanOrEqualToMatcher,
  NumberLessThanMatcher,
  NumberLessThanOrEqualToMatcher,
  StringMatchingMatcher,
  TruthyMatcher,
} from './matchers'
import { ArrayOfLengthMatcher } from './matchers/ArrayOfLength'
import { ObjectWithMatcher } from './matchers/ObjectWith'
import { Matchers } from './matchers/types'
import { DynamicMatcher } from './plugins/types'

export interface Expect extends Matchers {
  /**
   * The `expect` function is used every time you want to test a value.
   *
   * @param actual - the value to match against.
   * @param options - optional configuration.
   */
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>
}

/**
 * The `expect` function is used every time you want to test a value.
 *
 * @param actual - the value to match against.
 * @param options - optional configuration.
 */
export const expect: Expect = <T>(actual: T, options: ExpectationOptions = {}): Expectation<T> => {
  return new Expectation(actual, false, options)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseToMatcher.make
expect.containerWith = ContainerWithMatcher.make
expect.arrayOfLength = ArrayOfLengthMatcher.make
expect.arrayWith = ArrayWithMatcher.make
expect.objectWith = ObjectWithMatcher.make
expect.numberGreaterThan = NumberGreaterThanMatcher.make
expect.numberGreaterThanOrEqualTo = NumberGreaterThanOrEqualToMatcher.make
expect.numberLessThan = NumberLessThanMatcher.make
expect.numberLessThanOrEqualTo = NumberLessThanOrEqualToMatcher.make
expect.truthy = TruthyMatcher.make
expect.falsy = FalsyMatcher.make
expect.defined = DefinedMatcher.make
expect.nullish = NullishMatcher.make

// dynamically load new matchers and attach to expect object
// used by plugin loader
export function loadMatchers(matchers: Record<string, DynamicMatcher>) {
  for (const [name, matcher] of Object.entries(matchers)) {
    ;(expect as any)[name] = matcher
  }
}
