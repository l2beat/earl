import { Expectation, ExpectationOptions } from './Expectation'
import { AMatcher } from './matchers/A'
import { AnythingMatcher } from './matchers/Anything'
import { ArrayContainingMatcher } from './matchers/ArrayContaining'
import { NumberCloseToMatcher } from './matchers/NumberCloseTo'
import { StringMatchingMatcher } from './matchers/StringMatching'

interface expectInterface {
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringMatching: typeof StringMatchingMatcher.make
  numberCloseTo: typeof NumberCloseToMatcher.make
  arrayContaining: typeof ArrayContainingMatcher.make
}

export const expect: expectInterface = <T>(actual: T, options: ExpectationOptions = {}): Expectation<T> => {
  return new Expectation(actual, false, options)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseToMatcher.make
expect.arrayContaining = ArrayContainingMatcher.make
