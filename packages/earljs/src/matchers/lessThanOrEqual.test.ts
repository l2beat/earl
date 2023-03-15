import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { lessThanOrEqual } from './lessThanOrEqual'

describe(lessThanOrEqual.name, () => {
  it('is correctly formatted', () => {
    expect(earl.lessThanOrEqual(10).toString()).to.equal('lessThanOrEqual(10)')
  })

  it('is type safe', () => {
    earl(9.5).toEqual(earl.lessThanOrEqual(10))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.lessThanOrEqual(10))
  })

  testMatcher(
    lessThanOrEqual(10),
    [10, 9, 9.5, 1, 0, -1, -100, -12356.789, -Infinity],
    [
      11,
      19.998,
      NaN,
      Infinity,
      ...TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
