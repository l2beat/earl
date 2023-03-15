import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_VALUES } from '../test/values'
import { falsy } from './falsy'

describe(falsy.name, () => {
  it('is correctly formatted', () => {
    expect(earl.falsy().toString()).to.equal('falsy()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.falsy())
  })

  testMatcher(
    falsy(),
    TEST_VALUES.filter((x) => !x),
    TEST_VALUES.filter((x) => !!x),
  )
})
