import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { subset } from './subset'

describe(subset.name, () => {
  it('is correctly formatted', () => {
    expect(earl.subset({ x: 1 }).toString()).to.equal('subset({ x: 1 })')
  })

  it('is type safe', () => {
    earl({ x: 1, y: 2 }).toEqual(earl.subset({ x: 1 }))
  })

  testMatcher(
    subset({ x: 1, a: earl.a(String) }),
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
