import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toBeNullish } from './toBeNullish'

describe(toBeNullish.name, () => {
  describe('without .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).toBeNullish()
      }).to.throw(
        'The value 42 is not nullish, but it was expected to be nullish.',
      )
    })

    it('passes for null', () => {
      expect(() => {
        earl(null).toBeNullish()
      }).not.to.throw()
    })

    it('passes for undefined', () => {
      expect(() => {
        earl(undefined).toBeNullish()
      }).not.to.throw()
    })
  })

  describe('with .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).not.toBeNullish()
      }).not.to.throw()
    })

    it('fails for null', () => {
      expect(() => {
        earl(null).not.toBeNullish()
      }).to.throw(
        'The value null is nullish, but it was expected not to be nullish.',
      )
    })

    it('fails for undefined', () => {
      expect(() => {
        earl(undefined).not.toBeNullish()
      }).to.throw(
        'The value undefined is nullish, but it was expected not to be nullish.',
      )
    })
  })
})
