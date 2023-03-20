import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { satisfies } from './satisfies'

describe(satisfies.name, () => {
  testMatcherFormat(
    earl.satisfies((x) => x === 2),
    'satisfies(???)',
  )

  describe('exactly true', () => {
    testMatcher(
      satisfies((x) => x === 2),
      [2],
      [3, 4],
    )
  })

  describe('truthy values', () => {
    testMatcher(
      satisfies((x) => x as boolean),
      [2, 'hello', true, [], {}],
      [0, '', false, null, undefined],
    )
  })
})
