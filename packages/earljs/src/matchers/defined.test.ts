import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { defined } from './defined'

describe(defined.name, () => {
  it('is correctly formatted', () => {
    expect(earl.defined().toString()).to.equal('defined()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.defined())
  })

  testMatcher(
    defined(),
    [1, 4, 'foo', true, [], {}, Symbol(), false, NaN, 0, -0, BigInt(0), ''],
    [null, undefined],
  )
})
