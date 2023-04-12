import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { falsy } from './falsy.js'

describe(falsy.name, () => {
  testMatcherFormat(earl.falsy(), 'falsy()')

  testMatcher(
    falsy(),
    TEST_VALUES.filter((x) => !x),
    TEST_VALUES.filter((x) => !!x),
  )
})
