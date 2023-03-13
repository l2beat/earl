import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { notEmpty } from './notEmpty'

describe(notEmpty.name, () => {
  it('is correctly formatted', () => {
    expect(earl.notEmpty().toString()).to.equal('notEmpty()')
  })

  it('is type safe', () => {
    earl('').not.toEqual(earl.notEmpty())
    earl('foo').toEqual(earl.notEmpty())
    earl([]).not.toEqual(earl.notEmpty())
    earl([1, 2]).toEqual(earl.notEmpty())
    earl(new Set()).not.toEqual(earl.notEmpty())
    earl(new Set([1, 2])).toEqual(earl.notEmpty())
    earl(new Map()).not.toEqual(earl.notEmpty())
    earl(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    ).toEqual(earl.notEmpty())
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.notEmpty())
  })

  testMatcher(
    notEmpty(),
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
