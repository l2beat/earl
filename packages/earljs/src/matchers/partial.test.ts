import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { partial } from './partial'

describe(partial.name, () => {
  it('is correctly formatted', () => {
    expect(earl.partial({ x: 1 }).toString()).to.equal('partial({ x: 1 })')
  })

  it('is type safe', () => {
    earl({ x: 1, y: 2 }).toEqual(earl.partial({ x: 1 }))
  })

  testMatcher(
    partial({ x: 1, a: earl.a(String) }),
    [
      { x: 1, a: 'foo' },
      { x: 1, a: 'foo', y: 2 },
    ],
    [
      { x: 1, a: 2 },
      { x: 1 },
      { a: 'foo' },
      { x: 'foo', a: 'bar' },
      undefined,
      null,
      'm',
      '',
      0,
      1,
      [],
      {},
    ],
  )
})
