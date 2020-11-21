import { Expectation, ExpectationOptions } from './Expectation'
import {
  AMatcher,
  ArrayWithMatcher,
  AnythingMatcher,
  ContainerWithMatcher,
  NumberCloseToMatcher,
  StringMatchingMatcher,
} from './matchers'
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

// dynamically load new matchers and attach to expect object
// used by plugin loader
export function loadMatchers(matchers: Record<string, DynamicMatcher>) {
  for (const [name, matcher] of Object.entries(matchers)) {
    ;(expect as any)[name] = matcher
  }
}
