import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_VALUES } from '../../test/values.js'
import { anything } from './anything.js'

describe(anything.name, () => {
  testMatcherFormat(earl.anything(), 'anything()')

  testMatcher(anything(), TEST_VALUES, [])

  describe.skip('is type safe', () => {
    it('matches with any value', () => {
      earl('foo').toEqual(earl.anything())
      earl(1).toEqual(earl.anything())
      earl(true).toEqual(earl.anything())
      earl(BigInt(1)).toEqual(earl.anything())
      earl(Symbol('foo')).toEqual(earl.anything())
      earl({}).toEqual(earl.anything())
      earl([]).toEqual(earl.anything())
      earl(null).toEqual(earl.anything())
      earl(undefined).toEqual(earl.anything())
    })
  })
})
