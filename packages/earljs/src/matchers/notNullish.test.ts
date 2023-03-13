import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { notNullish } from './notNullish'

describe(notNullish.name, () => {
  it('is correctly formatted', () => {
    expect(earl.notNullish().toString()).to.equal('notNullish()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.notNullish())
  })

  testMatcher(
    notNullish(),
    [1, 4, 'foo', true, [], {}, Symbol(), false, NaN, 0, -0, BigInt(0), ''],
    [null, undefined],
  )
})
