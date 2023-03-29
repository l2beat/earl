import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { between } from './between'

describe(between.name, () => {
  testMatcherFormat(earl.between(0, 1), 'between(0, 1)')

  describe('between(0, 1)', () => {
    testMatcher(
      between(0, 1),
      [0, 0.5, 0.75, 0.9999, 1, BigInt(0), BigInt(1)],
      [
        BigInt(-100),
        BigInt(100),
        100,
        -1,
        -100,
        -Number.EPSILON,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        NaN,
        ...TEST_VALUES.filter(
          (x) => typeof x !== 'number' && typeof x !== 'bigint',
        ),
      ],
    )
  })

  describe('between(100n, 200n)', () => {
    testMatcher(
      between(BigInt(100), BigInt(200)),
      [100, 101, 150, 200, BigInt(100), BigInt(101), BigInt(150), BigInt(200)],
      [
        99,
        50,
        0,
        -100,
        201,
        60000,
        BigInt(99),
        BigInt(50),
        BigInt(0),
        BigInt(-100),
        BigInt(201),
        BigInt(60000),
      ],
    )
  })

  describe('between(100, -100)', () => {
    testMatcher(
      between(100, -100),
      [-100, -50, -1, 0, 1, 50, 100],
      [-200, -101, 101, 200],
    )
  })
})
