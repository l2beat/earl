import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_OBJECTS, TEST_PRIMITIVES } from '../../test/values'
import { includes } from './includes'

describe(includes.name, () => {
  class MyCollection<T> implements Iterable<T> {
    constructor(private readonly items: T[]) {}
    *[Symbol.iterator]() {
      yield* this.items
    }
  }

  it('is correctly formatted', () => {
    expect(earl.includes(2).toString()).to.equal('includes(2)')
    expect(earl.includes(2, 5).toString()).to.equal('includes(2, 5)')
    expect(earl.includes(earl.a(Number)).toString()).to.equal(
      'includes(expect.a(Number))',
    )
  })

  it('is type safe', () => {
    earl(['foo', 'bar']).toEqual(earl.includes('foo'))
    earl(new Set(['foo', 'bar'])).toEqual(earl.includes('foo'))
    earl(new MyCollection(['foo', 'bar'])).toEqual(earl.includes('foo'))
    earl('foo').toEqual(earl.includes('f'))
  })

  it('works with matchers', () => {
    expect(() => {
      earl(['foo', 'bar', 2]).toEqual(earl.includes(earl.a(Number)))
    }).not.to.throw()
  })

  describe('includes(2)', () => {
    testMatcher(
      includes(2),
      [
        [2],
        [1, 2],
        [1, 2, 3],
        [2, 1],
        [2, 2],
        new Set([2]),
        new Set([2, 3]),
        new MyCollection([2]),
        new MyCollection([2, 3]),
      ],
      [
        [],
        [3, 4],
        new Set(),
        new Set([3, 4]),
        new MyCollection([]),
        new MyCollection([3, 4]),
        ...TEST_PRIMITIVES,
        ...TEST_OBJECTS,
      ],
    )
  })

  describe('includes(2, 2, 5)', () => {
    testMatcher(
      includes(2, 2, 5),
      [
        [2, 2, 5],
        [1, 5, 2, 4, 2],
        [5, 2, 2, 2, 5],
        new MyCollection([2, 2, 5]),
        new MyCollection([1, 5, 2, 4, 2]),
        new MyCollection([5, 2, 2, 2, 5]),
      ],
      [
        [2, 5],
        new Set([2, 2, 5]),
        [],
        [1, 2, 3, 4, 5, 6, 7, 8],
        new MyCollection([2, 5]),
        new MyCollection([]),
        new MyCollection([1, 2, 3, 4, 5, 6, 7, 8]),
        ...TEST_PRIMITIVES,
        ...TEST_OBJECTS,
      ],
    )
  })

  describe('includes(a(Number), a(String))', () => {
    testMatcher(
      includes(earl.a(Number), earl.a(String)),
      [
        [2, 'foo'],
        ['foo', 'bar', 4],
        new MyCollection([2, 'foo']),
        new Set([2, 'foo']),
      ],
      [
        [],
        [1, 2, 3],
        ['foo', 'bar', true, null],
        [2, 5],
        new Set([2, 2, 5]),
        [],
        [1, 2, 3, 4, 5, 6, 7, 8],
        new MyCollection([2, 5]),
        new MyCollection([]),
        new MyCollection([1, 2, null]),
        ...TEST_PRIMITIVES,
        ...TEST_OBJECTS,
      ],
    )
  })

  describe('includes("foo")', () => {
    testMatcher(
      includes('foo'),
      [
        'this is foo',
        'foo',
        [2, 'foo'],
        ['foo', 'bar', 4],
        new MyCollection([2, 'foo']),
        new Set([2, 'foo']),
      ],
      [
        'magic',
        'fo of',
        '',
        ...TEST_PRIMITIVES.filter((x) => typeof x !== 'string'),
        ...TEST_OBJECTS,
      ],
    )
  })
})
