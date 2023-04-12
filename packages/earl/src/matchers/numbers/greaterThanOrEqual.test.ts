import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { greaterThanOrEqual } from './greaterThanOrEqual.js'

describe(greaterThanOrEqual.name, () => {
  testMatcherFormat(earl.greaterThanOrEqual(10), 'greaterThanOrEqual(10)')

  describe('greaterThanOrEqual(10)', () => {
    testMatcher(
      greaterThanOrEqual(10),
      [
        10,
        11,
        10.5,
        100,
        12356.789,
        Infinity,
        BigInt(10),
        BigInt(11),
        BigInt(100),
      ],
      [
        0,
        0.5,
        1,
        -0.0001,
        9.998,
        5,
        -4,
        NaN,
        -Infinity,
        BigInt(0),
        BigInt(-100),
        ...TEST_VALUES.filter(
          (x) => typeof x !== 'number' && typeof x !== 'bigint',
        ),
      ],
    )
  })

  describe('greaterThanOrEqual(10n)', () => {
    testMatcher(
      greaterThanOrEqual(BigInt(10)),
      [10, 11, 10.5, 100, 12356.789, BigInt(10), BigInt(11), BigInt(100)],
      [0, 0.5, 1, -0.0001, 9.998, BigInt(0), BigInt(-100)],
    )
  })
})
