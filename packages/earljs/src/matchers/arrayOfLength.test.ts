import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { arrayOfLength } from './arrayOfLength'

describe(arrayOfLength.name, () => {
  it('is correctly formatted', () => {
    expect(earl.arrayOfLength(2).toString()).to.equal('arrayOfLength(2)')
    expect(earl.arrayOfLength(earl.a(Number)).toString()).to.equal(
      'arrayOfLength(Matcher a(Number))',
    )
  })

  it('is type safe', () => {
    earl(['foo', 'bar']).toEqual(earl.arrayOfLength(2))
    // @ts-expect-error - type mismatch
    earl('foo').not.toEqual(earl.arrayOfLength(2))
  })

  it('works with matchers', () => {
    expect(() => {
      earl(['foo', 'bar']).toEqual(earl.arrayOfLength(earl.a(Number)))
    }).not.to.throw()
  })

  testMatcher(
    arrayOfLength(2),
    [
      [1, 2],
      ['a', 'b'],
      [1, 'a'],
    ],
    ['green', '', 0, 1, undefined, null, [], {}],
  )
})
