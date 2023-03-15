import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { negative } from './negative'

describe(negative.name, () => {
  it('is correctly formatted', () => {
    expect(earl.negative().toString()).to.equal('negative()')
  })

  it('is type safe', () => {
    earl(-10.5).toEqual(earl.negative())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.negative())
  })

  testMatcher(
    negative(),
    [-Number.EPSILON, -0.5, -1, -4, -11, -10.5, -100, -12356.789, -Infinity],
    [
      0,
      NaN,
      Number.EPSILON,
      0.5,
      1,
      4,
      11,
      10.5,
      100,
      12356.789,
      Infinity,
      TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
