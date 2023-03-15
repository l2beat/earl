import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeGreaterThanOrEqual } from './toBeGreaterThanOrEqual'

describe(toBeGreaterThanOrEqual.name, () => {
  describe('without .not', () => {
    describe('numbers', () => {
      it('passes for a number greater than expected', () => {
        expect(() => {
          earl(15).toBeGreaterThanOrEqual(10)
        }).not.to.throw()
      })

      it('passes for a number equal to expected', () => {
        expect(() => {
          earl(10).toBeGreaterThanOrEqual(10)
        }).not.to.throw()
      })

      it('fails for a number less than expected', () => {
        expect(() => {
          earl(5).toBeGreaterThanOrEqual(10)
        }).to.throw("5 isn't greater than or equal to 10")
      })
    })

    describe('bigints', () => {
      it('passes for a bigint greater than expected', () => {
        expect(() => {
          earl(BigInt(15)).toBeGreaterThanOrEqual(BigInt(10))
        }).not.to.throw()
      })

      it('passes for a bigint equal to expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeGreaterThanOrEqual(BigInt(10))
        }).not.to.throw()
      })

      it('fails for a bigint less than expected', () => {
        expect(() => {
          earl(BigInt(5)).toBeGreaterThanOrEqual(BigInt(10))
        }).to.throw("5n isn't greater than or equal to 10n")
      })
    })
  })

  describe('with .not', () => {
    it('fails for a number greater than or equal to expected', () => {
      expect(() => {
        earl(15).not.toBeGreaterThanOrEqual(10)
      }).to.throw('15 is greater than or equal to 10')
    })

    it('fails for a number equal to expected', () => {
      expect(() => {
        earl(10).not.toBeGreaterThanOrEqual(10)
      }).to.throw('10 is greater than or equal to 10')
    })

    it('passes for a number less than expected', () => {
      expect(() => {
        earl(5).not.toBeGreaterThanOrEqual(10)
      }).not.to.throw()
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(10).toBeGreaterThanOrEqual(5)
      earl(BigInt(10)).toBeGreaterThanOrEqual(BigInt(5))
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toBeGreaterThanOrEqual(10)
    })
  })
})
