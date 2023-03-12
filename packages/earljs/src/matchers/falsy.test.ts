import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { falsy } from './falsy'

describe(falsy.name, () => {
  it('is correctly formatted', () => {
    expect(earl.falsy().toString()).to.equal('falsy()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.falsy())
  })

  testMatcher(
    falsy(),
    [null, undefined, false, NaN, 0, -0, BigInt(0), ''],
    [1, 4, 'foo', true, [], {}, Symbol()],
  )
})
