import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { min } from './min'

describe(min.name, () => {
  it('is correctly formatted', () => {
    expect(earl.min(10).toString()).to.equal('min(10)')
  })

  it('is type safe', () => {
    earl(10.5).toEqual(earl.min(10))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.min(10))
  })

  testMatcher(
    min(10),
    [10, 11, 10.5, 100, 12356.789],
    [0, 0.5, 1, -0.0001, 9.998, 5, -4, 'green', '', [], {}],
  )
})
