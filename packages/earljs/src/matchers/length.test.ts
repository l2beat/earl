import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { length } from './length'

describe(length.name, () => {
  it('is correctly formatted', () => {
    expect(earl.length(2).toString()).to.equal('length(2)')
    expect(earl.length(earl.a(Number)).toString()).to.equal(
      'length(Matcher a(Number))',
    )
  })

  it('is type safe', () => {
    earl(['foo', 'bar']).toEqual(earl.length(2))
    earl('foo').toEqual(earl.length(3))
    earl({ length: 5 }).toEqual(earl.length(5))
    // @ts-expect-error - type mismatch
    earl({ notLength: 5 }).not.toEqual(earl.length(1))
    // @ts-expect-error - type mismatch
    earl(null).not.toEqual(earl.length(2))
  })

  it('works with matchers', () => {
    expect(() => {
      earl(['foo', 'bar']).toEqual(earl.length(earl.a(Number)))
    }).not.to.throw()
  })

  testMatcher(
    length(2),
    [[1, 2], ['a', 'b'], [1, 'a'], 'fo', { length: 2 }],
    ['green', '', 0, 1, undefined, null, [], {}],
  )
})
