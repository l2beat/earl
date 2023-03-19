import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { notNullish } from './notNullish'

describe(notNullish.name, () => {
  it('is correctly formatted', () => {
    expect(earl.notNullish().toString()).to.equal('notNullish()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.notNullish())
  })

  testMatcher(
    notNullish(),
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
    [null, undefined],
  )
})
