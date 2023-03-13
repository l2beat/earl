import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { greaterThanOrEqual } from './greaterThanOrEqual'

describe(greaterThanOrEqual.name, () => {
  it('is correctly formatted', () => {
    expect(earl.greaterThanOrEqual(10).toString()).to.equal(
      'greaterThanOrEqual(10)',
    )
  })

  it('is type safe', () => {
    earl(10.5).toEqual(earl.greaterThanOrEqual(10))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.greaterThanOrEqual(10))
  })

  testMatcher(
    greaterThanOrEqual(10),
    [10, 11, 10.5, 100, 12356.789],
    [0, 0.5, 1, -0.0001, 9.998, 5, -4, 'green', '', [], {}],
  )
})
