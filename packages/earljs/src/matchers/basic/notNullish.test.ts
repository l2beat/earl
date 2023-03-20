import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { notNullish } from './notNullish'

describe(notNullish.name, () => {
  testMatcherFormat(earl.notNullish(), 'notNullish()')

  testMatcher(
    notNullish(),
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
    [null, undefined],
  )
})
