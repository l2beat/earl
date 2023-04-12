import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { satisfies } from './satisfies.js'

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
