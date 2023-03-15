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

  describe('lessThanOrEqual(10)', () => {
    testMatcher(
      lessThanOrEqual(10),
      [
        10,
        9,
        9.5,
        1,
        0,
        -1,
        -100,
        -12356.789,
        -Infinity,
        BigInt(10),
        BigInt(9),
        BigInt(0),
        BigInt(-100),
      ],
      [
        11,
        19.998,
        NaN,
        Infinity,
        BigInt(100),
        ...TEST_VALUES.filter(
          (x) => typeof x !== 'number' && typeof x !== 'bigint',
        ),
      ],
    )
  })

  describe('lessThanOrEqual(10n)', () => {
    testMatcher(
      lessThanOrEqual(BigInt(10)),
      [10, 9, 9.5, 0, -100, BigInt(10), BigInt(9), BigInt(0), BigInt(-100)],
      [100, BigInt(100)],
    )
  })
})
