import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { negative } from './negative'

describe(negative.name, () => {
  it('is correctly formatted', () => {
    expect(earl.negative().toString()).to.equal('negative()')
  })

  it('is type safe', () => {
    earl(-10.5).toEqual(earl.negative())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.negative())
  })

  testMatcher(
    negative(),
    [-0.0001, -1, -4, -11, -10.5, -100, -12356.789],
    [0, 4, 12.5, 'green', '', [], {}],
  )
})
