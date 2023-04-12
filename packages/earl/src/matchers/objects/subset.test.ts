import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_OBJECTS, TEST_VALUES } from '../../test/values.js'
import { subset } from './subset.js'

describe(subset.name, () => {
  testMatcherFormat(earl.subset({ x: 1 }), 'subset({ x: 1 })')

  testMatcher(
    subset({ x: 1, a: earl.a(String) }),
    [
      { x: 1, a: 'foo' },
      { x: 1, a: 'foo', y: 2 },
    ],
    [
      {},
      { x: 1, a: 2 },
      { x: 1 },
      { a: 'foo' },
      { x: 'foo', a: 'bar' },
      ...TEST_VALUES.filter((x) => !TEST_OBJECTS.includes(x)),
    ],
  )
})
