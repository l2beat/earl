import { Expectation, ExpectationOptions } from './Expectation'
import {
  AMatcher,
  AnythingMatcher,
  ContainerWithMatcher,
  NumberCloseToMatcher,
  StringMatchingMatcher,
} from './matchers'
import { DynamicMatcher } from './plugins/types'
import { WrapWithName } from './types'

export interface ExpectInterface {
  <T>(actual: T, options?: ExpectationOptions): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringMatching: typeof StringMatchingMatcher.make
  numberCloseTo: typeof NumberCloseToMatcher.make
  containerWith: typeof ContainerWithMatcher.make
}

export const expect: ExpectInterface = <T>(actual: T, options: ExpectationOptions = {}): Expectation<T> => {
  return new Expectation(actual, false, options)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringMatching = StringMatchingMatcher.make
expect.numberCloseTo = NumberCloseToMatcher.make
expect.containerWith = ContainerWithMatcher.make

// dynamically load new matchers and attach to expect object
// used by plugin loader
export function loadMatchers(matchers: WrapWithName<DynamicMatcher>[]) {
  for (const matcher of matchers) {
    ;(expect as any)[matcher.name] = matcher.value
  }
}
