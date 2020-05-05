import { Expectation } from './Expectation'
import { AnythingMatcher } from './matchers'

interface expectInterface {
  <T>(actual: T): Expectation<T>
  anything(): any
}

export const expect: expectInterface = <T>(actual: T): Expectation<T> => {
  return new Expectation(actual)
}
expect.anything = AnythingMatcher.make
