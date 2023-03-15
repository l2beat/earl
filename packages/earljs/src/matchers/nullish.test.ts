import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { nullish } from './nullish'

describe(nullish.name, () => {
  it('is correctly formatted', () => {
    expect(earl.nullish().toString()).to.equal('nullish()')
  })

  it('is type safe', () => {
    earl(null).toEqual(earl.nullish())
    earl(undefined).toEqual(earl.nullish())
    // THIS ISN'T ACTUALLY TYPE SAFE :(
    earl('foo').not.toEqual(earl.nullish())
  })

  testMatcher(
    nullish(),
    [null, undefined],
    TEST_VALUES.filter((x) => x !== null && x !== undefined),
  )
})
