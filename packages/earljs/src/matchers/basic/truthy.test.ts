import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { truthy } from './truthy'

describe(truthy.name, () => {
  testMatcherFormat(earl.truthy(), 'truthy()')

  testMatcher(
    truthy(),
    TEST_VALUES.filter((x) => !!x),
    TEST_VALUES.filter((x) => !x),
  )
})
