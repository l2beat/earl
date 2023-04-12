import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { anything } from './anything.js'

describe(anything.name, () => {
  testMatcherFormat(earl.anything(), 'anything()')

  testMatcher(anything(), TEST_VALUES, [])
})
