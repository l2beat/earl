import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { nullish } from './nullish'

describe(nullish.name, () => {
  testMatcherFormat(earl.nullish(), 'nullish()')

  testMatcher(
    nullish(),
    [null, undefined],
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
  )
})
