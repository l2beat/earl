import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toBeLessThanOrEqual } from './toBeLessThanOrEqual.js'

describe(toBeLessThanOrEqual.name, () => {
  describe('without .not', () => {
    describe('numbers', () => {
      it('passes for a number less than expected', () => {
        expect(() => {
          earl(10).toBeLessThanOrEqual(15)
        }).not.to.throw()
      })

      it('passes for a number equal to expected', () => {
        expect(() => {
          earl(10).toBeLessThanOrEqual(10)
        }).not.to.throw()
      })

      it('fails for a number greater than expected', () => {
        expect(() => {
          earl(10).toBeLessThanOrEqual(5)
        }).to.throw(
          'The value 10 is not less than or equal to 5, but it was expected to be.',
        )
      })
    })

    describe('bigints', () => {
      it('passes for a bigint less than expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThanOrEqual(BigInt(15))
        }).not.to.throw()
      })

      it('passes for a bigint equal to expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThanOrEqual(BigInt(10))
        }).not.to.throw()
      })

      it('fails for a bigint greater than expected', () => {
        expect(() => {
          earl(BigInt(10)).toBeLessThanOrEqual(BigInt(5))
        }).to.throw(
          'The value 10n is not less than or equal to 5n, but it was expected to be.',
        )
      })
    })
  })

  describe('with .not', () => {
    it('fails for a number less than or equal to expected', () => {
      expect(() => {
        earl(5).not.toBeLessThanOrEqual(15)
      }).to.throw(
        'The value 5 is less than or equal to 15, but it was expected not to be.',
      )
    })

    it('fails for a number equal to expected', () => {
      expect(() => {
        earl(10).not.toBeLessThanOrEqual(10)
      }).to.throw(
        'The value 10 is less than or equal to 10, but it was expected not to be.',
      )
    })

    it('passes for a number greater than expected', () => {
      expect(() => {
        earl(10).not.toBeLessThanOrEqual(5)
      }).not.to.throw()
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(5).toBeLessThanOrEqual(10)
      earl(BigInt(5)).toBeLessThanOrEqual(BigInt(10))
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toBeLessThanOrEqual(10)
    })
  })
})
