import { autofix } from './autofix'
import { Expectation } from './Expectation'
import { AMatcher } from './matchers/asymmetric/A'
import { AnythingMatcher } from './matchers/asymmetric/Anything'
import { StringContainingMatcher } from './matchers/asymmetric/StringContaining'

interface expectInterface {
  <T>(actual: T): Expectation<T>

  // asymmetric matchers
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
