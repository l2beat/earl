import { autofix } from './autofix'
import { Expectation } from './Expectation'
import { AMatcher } from './matchers/A'
import { AnythingMatcher } from './matchers/Anything'
import { NumberCloseTo } from './matchers/NumberCloseTo'
import { StringMatchingMatcher } from './matchers/StringMatching'

interface expectInterface {
  <T>(actual: T): Expectation<T>
  <T>(actual: T): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringMatching: typeof StringMatchingMatcher.make
  numberCloseTo: typeof NumberCloseTo.make
}

export const expect: expectInterface = <T>(actual: T): Expectation<T> => {
  return new Expectation(autofix(), actual)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseTo.make
