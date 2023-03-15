import { expect } from 'chai'

import { expect as earl } from '../index'

describe('toBeLessThan', () => {
  describe('without .not', () => {
    describe('numbers', () => {
      it('passes for a number less than expected', () => {
        expect(() => {
          earl(10).toBeLessThan(15)
        }).not.to.throw()
      })

      it('fails for equal numbers', () => {
        expect(() => {
          earl(10).toBeLessThan(10)
        }).to.throw("10 isn't less than 10")
      })

      it('fails for a number greater than expected', () => {
        expect(() => {
          earl(10).toBeLessThan(5)
        }).to.throw("10 isn't less than 5")
      })
    })

    describe('bigints', () => {
      it('passes for a bigint less than expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThan(BigInt(15))
        }).not.to.throw()
      })

      it('fails for equal bigints', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThan(BigInt(10))
        }).to.throw("10n isn't less than 10n")
      })

      it('fails for a bigint greater than expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThan(BigInt(5))
        }).to.throw("10n isn't less than 5n")
      })
    })
  })

  describe('with .not', () => {
    it('fails for a number less than expected', () => {
      expect(() => {
        earl(5).not.toBeLessThan(15)
      }).to.throw('5 is less than 15')
    })

    it('passes for equal numbers', () => {
      expect(() => {
        earl(10).not.toBeLessThan(10)
      }).not.to.throw()
    })

    it('passes for a number greater than expected', () => {
      expect(() => {
        earl(10).not.toBeLessThan(5)
      }).not.to.throw()
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(5).toBeLessThan(10)
      earl(BigInt(5)).toBeLessThan(BigInt(10))
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toBeLessThan(10)
    })
  })
})
