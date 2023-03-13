import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { property } from './property'

describe(property.name, () => {
  it('is correctly formatted', () => {
    expect(earl.property('foo').toString()).to.equal('property("foo")')
    expect(earl.property('foo', 42).toString()).to.equal('property("foo", 42)')
  })

  it('is type safe', () => {
    earl({ x: 1, y: 2 }).toEqual(earl.property('x', 1))
  })

  describe('property("foo")', () => {
    testMatcher(
      property('foo'),
      [{ foo: 1 }, { foo: 1, bar: 'baz' }],
      [{ bar: 'baz' }, undefined, null, 'm', '', 0, 1, [], {}],
    )
  })

  describe('property("foo", 42)', () => {
    testMatcher(
      property('foo', 42),
      [{ foo: 42 }, { foo: 42, bar: 'baz' }],
      [
        { foo: 1 },
        { foo: false },
        { bar: 'baz' },
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

  describe('property("foo", undefined)', () => {
    testMatcher(
      property('foo', undefined),
      [{ foo: undefined }, { foo: undefined, bar: 'baz' }],
      [
        { foo: 1 },
        { foo: false },
        { bar: 'baz' },
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

  describe('property("foo", a(String))', () => {
    testMatcher(
      property('foo', earl.a(String)),
      [{ foo: 'xyz' }, { foo: 'xyz', bar: 'baz' }],
      [{ foo: 1 }, { foo: false }, undefined, null, 'm', '', 0, 1, [], {}],
    )
  })
})
