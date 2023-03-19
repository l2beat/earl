import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeGreaterThan } from './toBeGreaterThan'

describe(toBeGreaterThan.name, () => {
  describe('without .not', () => {
    describe('numbers', () => {
      it('passes for a number greater than expected', () => {
        expect(() => {
          earl(15).toBeGreaterThan(10)
        }).not.to.throw()
      })

      it('fails for equal numbers', () => {
        expect(() => {
          earl(10).toBeGreaterThan(10)
        }).to.throw(
          'The value 10 is not greater than 10, but it was expected to be.',
        )
      })

      it('fails for a number less than expected', () => {
        expect(() => {
          earl(5).toBeGreaterThan(10)
        }).to.throw(
          'The value 5 is not greater than 10, but it was expected to be.',
        )
      })
    })

    describe('bigints', () => {
      it('passes for a bigint greater than expected', () => {
        expect(() => {
          earl(BigInt(15)).toBeGreaterThan(BigInt(10))
        }).not.to.throw()
      })

      it('fails for equal bigints', () => {
        expect(() => {
          earl(BigInt(10)).toBeGreaterThan(BigInt(10))
        }).to.throw(
          'The value 10n is not greater than 10n, but it was expected to be.',
        )
      })

      it('fails for a bigint less than expected', () => {
        expect(() => {
          earl(BigInt(5)).toBeGreaterThan(BigInt(10))
        }).to.throw(
          'The value 5n is not greater than 10n, but it was expected to be.',
        )
      })
    })
  })

  describe('with .not', () => {
    it('fails for a number greater than expected', () => {
      expect(() => {
        earl(15).not.toBeGreaterThan(10)
      }).to.throw(
        'The value 15 is greater than 10, but it was expected not to be.',
      )
    })

    it('passes for equal numbers', () => {
      expect(() => {
        earl(10).not.toBeGreaterThan(10)
      }).not.to.throw()
    })

    it('passes for a number less than expected', () => {
      expect(() => {
        earl(5).not.toBeGreaterThan(10)
      }).not.to.throw()
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(10).toBeGreaterThan(5)
      earl(BigInt(10)).toBeGreaterThan(BigInt(5))
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toBeGreaterThan(10)
    })
  })
})
