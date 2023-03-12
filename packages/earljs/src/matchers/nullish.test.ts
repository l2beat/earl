import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { nullish } from './nullish'

describe(nullish.name, () => {
  it('is correctly formatted', () => {
    expect(earl.nullish().toString()).to.equal('nullish()')
  })

  it('is type safe', () => {
    earl(null).toEqual(earl.nullish())
    earl(undefined).toEqual(earl.nullish())
    // THIS ISN'T ACTUALLY TYPE SAFE :(
    earl('foo').not.toEqual(earl.nullish())
  })

  testMatcher(nullish(), [undefined, null], ['m', '', 0, 1, [], {}])
})
