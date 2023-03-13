import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { satisfies } from './satisfies'

describe(satisfies.name, () => {
  it('is correctly formatted', () => {
    expect(earl.satisfies((x) => x !== undefined).toString()).to.equal(
      'satisfies(???)',
    )
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.satisfies((x) => x !== undefined))
  })

  testMatcher(
    satisfies((x) => x !== undefined),
    [
      null,
      false,
      NaN,
      0,
      -0,
      BigInt(0),
      '',
      1,
      4,
      'foo',
      true,
      [],
      {},
      Symbol(),
    ],
    [undefined],
  )
})
