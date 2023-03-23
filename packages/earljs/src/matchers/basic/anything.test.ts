import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { anything } from './anything'

describe(anything.name, () => {
  testMatcherFormat(earl.anything(), 'anything()')

  testMatcher(anything(), TEST_VALUES, [])
})
