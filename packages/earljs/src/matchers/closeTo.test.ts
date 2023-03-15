import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { closeTo } from './closeTo'

describe(closeTo.name, () => {
  it('is correctly formatted', () => {
    expect(earl.closeTo(1, 0.001).toString()).to.equal('closeTo(1, 0.001)')
  })

  it('is type safe', () => {
    earl(1.000004).toEqual(earl.closeTo(1, 0.001))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.closeTo(1, 0.001))
  })

  testMatcher(
    closeTo(1, 0.001),
    [1, 0.99994, 1.00002, 1 + Number.EPSILON, 1 - Number.EPSILON],
    [
      1.002,
      9.998,
      5,
      123,
      -4,
      NaN,
      ...TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
