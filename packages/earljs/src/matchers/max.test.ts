import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { max } from './max'

describe(max.name, () => {
  it('is correctly formatted', () => {
    expect(earl.max(10).toString()).to.equal('max(10)')
  })

  it('is type safe', () => {
    earl(9.5).toEqual(earl.max(10))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.max(10))
  })

  testMatcher(
    max(10),
    [10, 9, 9.5, 1, 0, -1, -100, -12356.789],
    [11, 19.998, 'green', '', [], {}],
  )
})
