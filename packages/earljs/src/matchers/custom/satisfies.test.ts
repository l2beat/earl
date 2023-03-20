import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { satisfies } from './satisfies'

describe(satisfies.name, () => {
  testMatcherFormat(
    earl.satisfies((x) => x === 2),
    'satisfies(???)',
  )

  testMatcher(
    satisfies((x) => x === 2),
    [2],
    [3, 4],
  )
})
