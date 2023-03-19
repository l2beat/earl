import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { unsafeInteger } from './unsafeInteger'

describe(unsafeInteger.name, () => {
  testMatcherFormat(earl.unsafeInteger(), 'unsafeInteger()')

  testMatcher(
    unsafeInteger(),
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
    ],
    [
      0.5,
      -1.2,
      Infinity,
      -Infinity,
      NaN,
      TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
