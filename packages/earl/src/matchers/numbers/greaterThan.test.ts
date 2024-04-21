import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { greaterThan } from './greaterThan.js'

describe(greaterThan.name, () => {
  testMatcherFormat(earl.greaterThan(10), 'greaterThan(10)')

  describe('greaterThan(10)', () => {
    testMatcher(
      greaterThan(10),
      [
        11,
        10.5,
        100,
        12356.789,
        Number.POSITIVE_INFINITY,
        BigInt(11),
        BigInt(100),
      ],
      [
        10,
        0,
        0.5,
        1,
        -0.0001,
        9.998,
        5,
        -4,
        Number.NaN,
        Number.NEGATIVE_INFINITY,
        BigInt(10),
        BigInt(0),
        BigInt(-100),
        ...TEST_VALUES.filter(
          (x) => typeof x !== 'number' && typeof x !== 'bigint',
        ),
      ],
    )
  })

  describe('greaterThan(10n)', () => {
    testMatcher(
      greaterThan(BigInt(10)),
      [11, 10.5, 100, 12356.789, BigInt(11), BigInt(100)],
      [10, 0, 0.5, 1, -0.0001, 9.998, BigInt(10), BigInt(0), BigInt(-100)],
    )
  })
})
