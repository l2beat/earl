import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { defined } from './defined'

describe(defined.name, () => {
  testMatcherFormat(earl.defined(), 'defined()')

  testMatcher(
    defined(),
    TEST_VALUES.filter((x) => x !== undefined),
    [undefined],
  )
})
