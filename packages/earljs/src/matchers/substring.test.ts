import { substring } from './substring'
import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'

describe(substring.name, () => {
  it('is correctly formatted', () => {
    expect(earl.substring('test').toString()).to.equal('substring("test")')
  })

  it('is type safe', () => {
    earl('test').toEqual(earl.substring('test'))
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.substring('test'))
  })

  testMatcher(
    substring('test'),
    ['abc test cde', 'testtesttest'],
    ['', 'tes', 'abc-abc', undefined, 1, {}, []],
  )
})
