import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { integer } from './integer'

describe(integer.name, () => {
  it('is correctly formatted', () => {
    expect(earl.integer().toString()).to.equal('integer()')
  })

  it('is type safe', () => {
    earl(123).toEqual(earl.integer())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.integer())
  })

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
    ],
    [
      0.5,
      -1.2,
      Number.MAX_SAFE_INTEGER * 2,
      Number.MIN_SAFE_INTEGER * 2,
      Infinity,
      -Infinity,
      NaN,
      TEST_VALUES.filter((x) => typeof x !== 'number'),
    ],
  )
})
