import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { safeInteger } from './safeInteger'

describe(safeInteger.name, () => {
  testMatcherFormat(earl.safeInteger(), 'safeInteger()')

  testMatcher(
    safeInteger(),
    [
      10,
      0,
      -5,
      12353462456,
      -12353462456,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      BigInt(10),
      BigInt(0),
      BigInt(-5),
      BigInt(12353462456),
      BigInt(-12353462456),
      BigInt(Number.MAX_SAFE_INTEGER),
      BigInt(Number.MIN_SAFE_INTEGER),
    ],
    [
      0.5,
      -1.2,
      Number.MAX_SAFE_INTEGER * 2,
      Number.MIN_SAFE_INTEGER * 2,
      BigInt(Number.MAX_SAFE_INTEGER) * BigInt(2),
      BigInt(Number.MIN_SAFE_INTEGER) * BigInt(2),
      Infinity,
      -Infinity,
      NaN,
      TEST_VALUES.filter((x) => typeof x !== 'number' && typeof x !== 'bigint'),
    ],
  )
})
