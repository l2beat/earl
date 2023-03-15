import { expect } from 'chai'

import { expect as earl } from '../index'

describe('toBeGreaterThan', () => {
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
        }).to.throw("10 isn't greater than 10")
      })

      it('fails for a number less than expected', () => {
        expect(() => {
          earl(5).toBeGreaterThan(10)
        }).to.throw("5 isn't greater than 10")
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
        }).to.throw("10n isn't greater than 10n")
      })

      it('fails for a bigint less than expected', () => {
        expect(() => {
          earl(BigInt(5)).toBeGreaterThan(BigInt(10))
        }).to.throw("5n isn't greater than 10n")
      })
    })
  })

  describe('with .not', () => {
    it('fails for a number greater than expected', () => {
      expect(() => {
        earl(15).not.toBeGreaterThan(10)
      }).to.throw('15 is greater than 10')
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
