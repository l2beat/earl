import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { lessThan } from './lessThan.js'

describe(lessThan.name, () => {
  testMatcherFormat(earl.lessThan(10), 'lessThan(10)')

  describe('lessThan(10)', () => {
    testMatcher(
      lessThan(10),
      [
        9,
        9.5,
        1,
        0,
        -1,
        -100,
        -12356.789,
        -Infinity,
        BigInt(9),
        BigInt(0),
        BigInt(-100),
      ],
      [
        10,
        11,
        19.998,
        NaN,
        Infinity,
        BigInt(10),
        BigInt(100),
        ...TEST_VALUES.filter(
          (x) => typeof x !== 'number' && typeof x !== 'bigint',
        ),
      ],
    )
  })

  describe('lessThan(10n)', () => {
    testMatcher(
      lessThan(BigInt(10)),
      [9, 9.5, 0, -100, BigInt(9), BigInt(0), BigInt(-100)],
      [10, 100, BigInt(10), BigInt(100)],
    )
  })
})
