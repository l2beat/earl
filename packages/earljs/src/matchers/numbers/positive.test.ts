import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { positive } from './positive'

describe(positive.name, () => {
  it('is correctly formatted', () => {
    expect(earl.positive().toString()).to.equal('positive()')
  })

  it('is type safe', () => {
    earl(10.5).toEqual(earl.positive())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.positive())
  })

  testMatcher(
    positive(),
    [Number.EPSILON, 0.5, 1, 4, 11, 10.5, 100, 12356.789, Infinity],
    [
      0,
      NaN,
      -Number.EPSILON,
      -0.5,
      -1,
      -4,
      -11,
      -10.5,
      -100,
      -12356.789,
      -Infinity,
      TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
