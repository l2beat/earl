import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { length } from './length.js'

describe(length.name, () => {
  describe('formatting', () => {})
  it('is correctly formatted', () => {
    testMatcherFormat(earl.length(2), 'length(2)')
    testMatcherFormat(earl.length(earl.a(Number)), 'length(expect.a(Number))')
  })

  it('works with matchers', () => {
    expect(() => {
      earl(['foo', 'bar']).toEqual(earl.length(earl.a(Number)))
    }).not.to.throw()
  })

  testMatcher(
    length(2),
    [[1, 2], ['a', 'b'], [1, 'a'], 'fo', { length: 2 }],
    [
      [],
      [1],
      TEST_VALUES.filter((x) => !Array.isArray(x) && typeof x !== 'string'),
    ],
  )
})
