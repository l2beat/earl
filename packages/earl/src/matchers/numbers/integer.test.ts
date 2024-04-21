import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { integer } from './integer.js'

describe(integer.name, () => {
  testMatcherFormat(earl.integer(), 'integer()')

  testMatcher(
    integer(),
    [
      10,
      0,
      -5,
      12353462456,
      -12353462456,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER * 2,
      Number.MIN_SAFE_INTEGER * 2,
      BigInt(1234),
      BigInt(-1234),
    ],
    [
      0.5,
      -1.2,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NaN,
      TEST_VALUES.filter((x) => typeof x !== 'number' && typeof x !== 'bigint'),
    ],
  )
})
