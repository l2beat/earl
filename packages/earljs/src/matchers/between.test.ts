import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { between } from './between'

describe(between.name, () => {
  it('is correctly formatted', () => {
    expect(earl.between(0, 1).toString()).to.equal('between(0, 1)')
  })

  it('is type safe', () => {
    earl(0.5).toEqual(earl.between(0, 1))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.between(0, 1))
  })

  testMatcher(
    between(0, 1),
    [0, 0.5, 0.75, 0.9999],
    [1, -0.0001, 9.998, 5, 123, -4, 'green', '', [], {}],
  )
})
