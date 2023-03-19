import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { positive } from './positive'

describe(positive.name, () => {
  testMatcherFormat(earl.positive(), 'positive()')

  testMatcher(
    positive(),
    [
      Number.EPSILON,
      0.5,
      1,
      4,
      11,
      10.5,
      100,
      12356.789,
      Infinity,
      BigInt(1),
      BigInt(123456789),
    ],
    [
      0,
      NaN,
      -Number.EPSILON,
      -0.5,
      -1,
      -4,
      -11,
      -10.5,
      -100,
      -12356.789,
      -Infinity,
      BigInt(-1),
      BigInt(-123456789),
      TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
