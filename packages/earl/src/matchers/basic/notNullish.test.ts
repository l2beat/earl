import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { notNullish } from './notNullish.js'

describe(notNullish.name, () => {
  testMatcherFormat(earl.notNullish(), 'notNullish()')

  testMatcher(
    notNullish(),
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
    [null, undefined],
  )
})
