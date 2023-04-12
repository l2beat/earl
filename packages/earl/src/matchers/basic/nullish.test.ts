import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { nullish } from './nullish.js'

describe(nullish.name, () => {
  testMatcherFormat(earl.nullish(), 'nullish()')

  testMatcher(
    nullish(),
    [null, undefined],
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
  )
})
