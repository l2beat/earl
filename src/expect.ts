import { autofix } from './autofix'
import { Expectation } from './Expectation'
import { AMatcher } from './matchers/asymmetric/A'
import { AnythingMatcher } from './matchers/asymmetric/Anything'
import { AStringContainingMatcher } from './matchers/asymmetric/AStringContaining'

interface expectInterface {
  <T>(actual: T): Expectation<T>

  // asymmetric matchers
  anything: typeof AnythingMatcher.make
  a: typeof AMatcher.make
  aStringContaining: typeof AStringContainingMatcher.make
}

export const expect: expectInterface = <T>(actual: T): Expectation<T> => {
  return new Expectation(autofix(), actual)
}
expect.anything = AnythingMatcher.make
expect.a = AMatcher.make
expect.aStringContaining = AStringContainingMatcher.make
