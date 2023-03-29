import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_OBJECTS, TEST_VALUES } from '../../test/values'
import { subset } from './subset'

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
