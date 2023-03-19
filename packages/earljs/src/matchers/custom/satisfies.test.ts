import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { satisfies } from './satisfies'

describe(satisfies.name, () => {
  it('is correctly formatted', () => {
    expect(earl.satisfies((x) => x === 2).toString()).to.equal('satisfies(???)')
  })

  it('is type safe', () => {
    earl(2).toEqual(earl.satisfies((x) => x === 2))
  })

  testMatcher(
    satisfies((x) => x === 2),
    [2],
    [3, 4],
  )
})
