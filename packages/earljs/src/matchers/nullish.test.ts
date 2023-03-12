import { testMatcher } from '../test/matchers'
import { nullish } from './nullish'

describe(nullish.name, () => {
  testMatcher(nullish(), [undefined, null], ['m', '', 0, 1, [], {}])
})
