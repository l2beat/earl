import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { truthy } from './truthy.js'

describe(truthy.name, () => {
  testMatcherFormat(earl.truthy(), 'truthy()')

  testMatcher(
    truthy(),
    TEST_VALUES.filter((x) => !!x),
    TEST_VALUES.filter((x) => !x),
  )
})
