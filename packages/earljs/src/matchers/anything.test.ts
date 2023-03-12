import { testMatcher } from '../test/matchers'
import { anything } from './anything'

describe(anything.name, () => {
  testMatcher(anything(), ['m', '', 0, 1, undefined, null, [], {}], [])
})
