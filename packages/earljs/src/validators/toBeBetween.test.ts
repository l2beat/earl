import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeBetween } from './toBeBetween'

describe(toBeBetween.name, () => {
  describe('without .not', () => {
    describe('numbers', () => {
      it('passes for a number inside the range', () => {
        expect(() => {
          earl(5).toBeBetween(1, 10)
        }).not.to.throw()
      })

      it('fails for a number outside the range', () => {
        expect(() => {
          earl(15).toBeBetween(1, 10)
        }).to.throw(
          'The value 15 is not between 1 and 10, but it was expected to be.',
        )
      })

      it('passes for a number equal to the lower bound', () => {
        expect(() => {
          earl(1).toBeBetween(1, 10)
        }).not.to.throw()
      })

      it('fails for a number equal to the upper bound', () => {
        expect(() => {
          earl(10).toBeBetween(1, 10)
        }).to.throw(
          'The value 10 is not between 1 and 10, but it was expected to be.',
        )
      })
    })

    describe('bigints', () => {
      it('passes for a bigint inside the range', () => {
        expect(() => {
          earl(BigInt(5)).toBeBetween(BigInt(1), BigInt(10))
        }).not.to.throw()
      })

      it('fails for a bigint outside the range', () => {
        expect(() => {
          earl(BigInt(15)).toBeBetween(BigInt(1), BigInt(10))
        }).to.throw(
          'The value 15n is not between 1n and 10n, but it was expected to be.',
        )
      })
    })

    it('supports reverse argument order', () => {
      expect(() => {
        earl(5).toBeBetween(10, 1)
      }).not.to.throw()

      expect(() => {
        earl(15).toBeBetween(10, 1)
      }).to.throw(
        'The value 15 is not between 10 and 1, but it was expected to be.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for a number inside the range', () => {
      expect(() => {
        earl(5).not.toBeBetween(1, 10)
      }).to.throw(
        'The value 5 is between 1 and 10, but it was expected not to be.',
      )
    })

    it('passes for a number outside the range', () => {
      expect(() => {
        earl(15).not.toBeBetween(1, 10)
      }).not.to.throw()
    })
  })
})
