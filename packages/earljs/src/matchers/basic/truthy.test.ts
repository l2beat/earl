import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { truthy } from './truthy'

describe(truthy.name, () => {
  it('is correctly formatted', () => {
    expect(earl.truthy().toString()).to.equal('truthy()')
  })

  it('is type safe', () => {
    earl(123).toEqual(earl.truthy())
  })

  testMatcher(
    truthy(),
    TEST_VALUES.filter((x) => !!x),
    TEST_VALUES.filter((x) => !x),
  )
})
