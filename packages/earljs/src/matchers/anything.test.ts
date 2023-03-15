import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { anything } from './anything'

describe(anything.name, () => {
  it('is correctly formatted', () => {
    expect(earl.anything().toString()).to.equal('anything()')
  })

  it('is type safe', () => {
    earl('foo').toEqual(earl.anything())
    earl(undefined).toEqual(earl.anything())
  })

  testMatcher(anything(), TEST_VALUES, [])
})
