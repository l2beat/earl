import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { unsafeInteger } from './unsafeInteger'

describe(unsafeInteger.name, () => {
  it('is correctly formatted', () => {
    expect(earl.unsafeInteger().toString()).to.equal('unsafeInteger()')
  })

  it('is type safe', () => {
    earl(123).toEqual(earl.unsafeInteger())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.unsafeInteger())
  })

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
    [0.5, -1.2, 'green', '', [], {}],
  )
})
