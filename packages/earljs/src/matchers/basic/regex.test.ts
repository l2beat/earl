import { expect } from 'chai'

import { expect as earl } from '../../index'
import { testMatcher } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { regex } from './regex'

describe(regex.name, () => {
  it('is correctly formatted', () => {
    expect(earl.regex(/^[0-9]+$/).toString()).to.equal('regex(/^[0-9]+$/)')
  })

  it('is type safe', () => {
    earl('123').toEqual(earl.regex(/^[0-9]+$/))
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.regex(/^[0-9]+$/))
  })

  testMatcher(
    regex(/^[0-9]+$/),
    ['0', '1', '123', '123123123'],
    ['', 'tes', '123a', ...TEST_VALUES.filter((x) => typeof x !== 'string')],
  )
})
