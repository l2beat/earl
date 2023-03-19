import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { closeTo } from './closeTo'

describe(closeTo.name, () => {
  testMatcherFormat(earl.closeTo(1, 0.001), 'closeTo(1, 0.001)')

  testMatcher(
    closeTo(1, 0.001),
    [1, 0.99994, 1.00002, 1 + Number.EPSILON, 1 - Number.EPSILON],
    [
      1.002,
      9.998,
      5,
      123,
      -4,
      NaN,
      ...TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
