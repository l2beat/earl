import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { check } from './check'

describe(check.name, () => {
  it('is correctly formatted', () => {
    expect(earl.check((x) => x !== undefined).toString()).to.equal('check(???)')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.check((x) => x !== undefined))
  })

  testMatcher(
    check((x) => x !== undefined),
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
