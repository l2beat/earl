import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { lessThanOrEqual } from './lessThanOrEqual.js'

describe(lessThanOrEqual.name, () => {
  testMatcherFormat(earl.lessThanOrEqual(10), 'lessThanOrEqual(10)')

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
        Number.NEGATIVE_INFINITY,
        BigInt(10),
        BigInt(9),
        BigInt(0),
        BigInt(-100),
      ],
      [
        11,
        19.998,
        Number.NaN,
        Number.POSITIVE_INFINITY,
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
