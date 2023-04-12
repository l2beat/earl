import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { defined } from './defined.js'

describe(defined.name, () => {
  testMatcherFormat(earl.defined(), 'defined()')

  testMatcher(
    defined(),
    TEST_VALUES.filter((x) => x !== undefined),
    [undefined],
  )
})
