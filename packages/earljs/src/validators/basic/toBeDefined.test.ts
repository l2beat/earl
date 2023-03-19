import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toBeDefined } from './toBeDefined'

describe(toBeDefined.name, () => {
  describe('without .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).toBeDefined()
      }).not.to.throw()
    })

    it('fails for undefined', () => {
      expect(() => {
        earl(undefined).toBeDefined()
      }).to.throw(
        'The value undefined is undefined, but it was expected to be defined.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).not.toBeDefined()
      }).to.throw(
        'The value 42 is not undefined, but it was expected to be undefined.',
      )
    })

    it('passes for undefined', () => {
      expect(() => {
        earl(undefined).not.toBeDefined()
      }).not.to.throw()
    })
  })
})
