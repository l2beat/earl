import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_OBJECTS, TEST_PRIMITIVES } from '../test/values'
import { empty } from './empty'

describe(empty.name, () => {
  it('is correctly formatted', () => {
    expect(earl.empty().toString()).to.equal('empty()')
  })

  it('is type safe', () => {
    earl('').toEqual(earl.empty())
    earl('foo').not.toEqual(earl.empty())
    earl([]).toEqual(earl.empty())
    earl([1, 2]).not.toEqual(earl.empty())
    earl(new Set()).toEqual(earl.empty())
    earl(new Set([1, 2])).not.toEqual(earl.empty())
    earl(new Map()).toEqual(earl.empty())
    earl(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    ).not.toEqual(earl.empty())
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.empty())
  })

  testMatcher(
    empty(),
    [[], '', new Set(), new Map()],
    [
      [1],
      [1, 2],
      ' ',
      'foo',
      new Set([1, 2]),
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
      ...TEST_PRIMITIVES.filter((x) => x !== ''),
      ...TEST_OBJECTS,
    ],
  )
})
