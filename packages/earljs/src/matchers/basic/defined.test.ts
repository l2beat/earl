import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { defined } from './defined'

describe(defined.name, () => {
  it('is correctly formatted', () => {
    expect(earl.defined().toString()).to.equal('defined()')
  })

  it('is type safe', () => {
    earl(0).toEqual(earl.defined())
  })

  testMatcher(
    defined(),
    TEST_VALUES.filter((x) => x !== undefined),
    [undefined],
  )
})
