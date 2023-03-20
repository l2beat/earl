import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toBePositive } from './toBePositive'

describe(toBePositive.name, () => {
  describe('without .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).toBePositive()
      }).not.to.throw()
    })

    it('passes for 42n', () => {
      expect(() => {
        earl(BigInt(42)).toBePositive()
      }).not.to.throw()
    })

    it('fails for 0', () => {
      expect(() => {
        earl(0).toBePositive()
      }).to.throw(
        'The value 0 is not positive, but it was expected to be positive.',
      )
    })

    it('fails for -42', () => {
      expect(() => {
        earl(-42).toBePositive()
      }).to.throw(
        'The value -42 is not positive, but it was expected to be positive.',
      )
    })

    it('fails for -42n', () => {
      expect(() => {
        earl(BigInt(-42)).toBePositive()
      }).to.throw(
        'The value -42n is not positive, but it was expected to be positive.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).not.toBePositive()
      }).to.throw(
        'The value 42 is positive, but it was expected not to be positive.',
      )
    })

    it('fails for 42n', () => {
      expect(() => {
        earl(BigInt(42)).not.toBePositive()
      }).to.throw(
        'The value 42n is positive, but it was expected not to be positive.',
      )
    })

    it('passes for 0', () => {
      expect(() => {
        earl(0).not.toBePositive()
      }).not.to.throw()
    })

    it('passes for -42', () => {
      expect(() => {
        earl(-42).not.toBePositive()
      }).not.to.throw()
    })

    it('passes for -42n', () => {
      expect(() => {
        earl(BigInt(-42)).not.toBePositive()
      }).not.to.throw()
    })
  })
})
