import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toBeNegative } from '../numbers/toBeNegative'

describe(toBeNegative.name, () => {
  describe('without .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).toBeNegative()
      }).to.throw(
        'The value 42 is not negative, but it was expected to be negative.',
      )
    })

    it('fails for 42n', () => {
      expect(() => {
        earl(BigInt(42)).toBeNegative()
      }).to.throw(
        'The value 42n is not negative, but it was expected to be negative.',
      )
    })

    it('fails for 0', () => {
      expect(() => {
        earl(0).toBeNegative()
      }).to.throw(
        'The value 0 is not negative, but it was expected to be negative.',
      )
    })

    it('passes for -42', () => {
      expect(() => {
        earl(-42).toBeNegative()
      }).not.to.throw()
    })

    it('passes for -42n', () => {
      expect(() => {
        earl(BigInt(-42)).toBeNegative()
      }).not.to.throw()
    })
  })

  describe('with .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).not.toBeNegative()
      }).not.to.throw()
    })

    it('passes for 42n', () => {
      expect(() => {
        earl(BigInt(42)).not.toBeNegative()
      }).not.to.throw()
    })

    it('passes for 0', () => {
      expect(() => {
        earl(0).not.toBeNegative()
      }).not.to.throw()
    })

    it('fails for -42', () => {
      expect(() => {
        earl(-42).not.toBeNegative()
      }).to.throw(
        'The value -42 is negative, but it was expected not to be negative.',
      )
    })

    it('fails for -42n', () => {
      expect(() => {
        earl(BigInt(-42)).not.toBeNegative()
      }).to.throw(
        'The value -42n is negative, but it was expected not to be negative.',
      )
    })
  })
})
