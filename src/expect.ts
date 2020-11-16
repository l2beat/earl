import defaultExecutionCtx from './ExecutionCtx'
import { Expectation, ExpectationOptions } from './Expectation'
import { AMatcher } from './matchers/A'
import { AnythingMatcher } from './matchers/Anything'
import { ContainerWithMatcher } from './matchers/ContainerWith'
import { NumberCloseToMatcher } from './matchers/NumberCloseTo'
import { StringMatchingMatcher } from './matchers/StringMatching'

interface expectInterface {
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringMatching: typeof StringMatchingMatcher.make
  numberCloseTo: typeof NumberCloseToMatcher.make
  containerWith: typeof ContainerWithMatcher.make
}

export const expect: expectInterface = <T>(actual: T, options: ExpectationOptions = {}): Expectation<T> => {
  return new Expectation(actual, false, options, defaultExecutionCtx)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseToMatcher.make
expect.containerWith = ContainerWithMatcher.make
