import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { nonEmpty } from './nonEmpty'

describe(nonEmpty.name, () => {
  it('is correctly formatted', () => {
    expect(earl.nonEmpty().toString()).to.equal('nonEmpty()')
  })

  it('is type safe', () => {
    earl('').not.toEqual(earl.nonEmpty())
    earl('foo').toEqual(earl.nonEmpty())
    earl([]).not.toEqual(earl.nonEmpty())
    earl([1, 2]).toEqual(earl.nonEmpty())
    earl(new Set()).not.toEqual(earl.nonEmpty())
    earl(new Set([1, 2])).toEqual(earl.nonEmpty())
    earl(new Map()).not.toEqual(earl.nonEmpty())
    earl(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    ).toEqual(earl.nonEmpty())
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.nonEmpty())
  })

  testMatcher(
    nonEmpty(),
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
    ],
    [[], '', new Set(), new Map(), 0, 1, 4, -12.5, true, null, {}],
  )
})
