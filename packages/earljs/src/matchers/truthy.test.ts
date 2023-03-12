import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { truthy } from './truthy'

describe(truthy.name, () => {
  it('is correctly formatted', () => {
    expect(earl.truthy().toString()).to.equal('truthy()')
  })

  it('is type safe', () => {
    earl(123).toEqual(earl.truthy())
  })

  testMatcher(
    truthy(),
    [1, 4, 'foo', true, [], {}, Symbol()],
    [null, undefined, false, NaN, 0, -0, BigInt(0), ''],
  )
})
