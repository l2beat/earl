import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { lessThan } from './lessThan'

describe(lessThan.name, () => {
  it('is correctly formatted', () => {
    expect(earl.lessThan(10).toString()).to.equal('lessThan(10)')
  })

  it('is type safe', () => {
    earl(9.5).toEqual(earl.lessThan(10))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.lessThan(10))
  })

  testMatcher(
    lessThan(10),
    [9, 9.5, 1, 0, -1, -100, -12356.789, -Infinity],
    [
      10,
      11,
      19.998,
      NaN,
      Infinity,
      ...TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
