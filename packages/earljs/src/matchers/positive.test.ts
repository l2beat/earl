import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { positive } from './positive'

describe(positive.name, () => {
  it('is correctly formatted', () => {
    expect(earl.positive().toString()).to.equal('positive()')
  })

  it('is type safe', () => {
    earl(10.5).toEqual(earl.positive())
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.positive())
  })

  testMatcher(
    positive(),
    [0.0001, 1, 4, 11, 10.5, 100, 12356.789],
    [0, -4, -12.5, 'green', '', [], {}],
  )
})
