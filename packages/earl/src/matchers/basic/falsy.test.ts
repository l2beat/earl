import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { falsy } from './falsy'

describe(falsy.name, () => {
  testMatcherFormat(earl.falsy(), 'falsy()')

  testMatcher(
    falsy(),
    TEST_VALUES.filter((x) => !x),
    TEST_VALUES.filter((x) => !!x),
  )
})
