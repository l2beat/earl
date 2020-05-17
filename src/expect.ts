import { autofix } from './autofix'
import { Expectation } from './Expectation'
import { AMatcher } from './matchers/A'
import { AnythingMatcher } from './matchers/Anything'
import { StringContainingMatcher } from './matchers/StringContaining'

interface expectInterface {
  <T>(actual: T): Expectation<T>
  <T>(actual: T): Expectation<T>

  // matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  stringContaining: typeof StringContainingMatcher.make
}

export const expect: expectInterface = <T>(actual: T): Expectation<T> => {
  return new Expectation(autofix(), actual)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.stringContaining = StringContainingMatcher.make
