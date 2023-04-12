import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toExactlyEqual } from './toExactlyEqual.js'

describe(toExactlyEqual.name, () => {
  describe('without .not', () => {
    it('passes for same reference', () => {
      const x = { a: 1 }
      expect(() => {
        earl(x).toExactlyEqual(x)
      }).not.to.throw()
    })

    it('passes for NaNs', () => {
      expect(() => {
        // @ts-expect-error - desired behavior
        earl(NaN).toExactlyEqual(NaN)
      }).not.to.throw()
    })

    it('passes for +0 and -0', () => {
      expect(() => {
        // @ts-expect-error - desired behavior
        earl(+0).toExactlyEqual(-0)
      }).not.to.throw()
    })

    it('fails for different reference', () => {
      expect(() => {
        earl({ a: 1 }).toExactlyEqual({ a: 1 })
      }).to.throw(
        'The value { a: 1 } is not the exact same value as { a: 1 }, but it was expected to be.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for same reference', () => {
      const x = { a: 1 }
      expect(() => {
        earl(x).not.toExactlyEqual(x)
      }).to.throw(
        'The value { a: 1 } is the exact same value as { a: 1 }, but it was expected not to be.',
      )
    })

    it('fails for NaNs', () => {
      expect(() => {
        // @ts-expect-error - desired behavior
        earl(NaN).not.toExactlyEqual(NaN)
      }).to.throw(
        'The value NaN is the exact same value as NaN, but it was expected not to be.',
      )
    })

    it('fails for +0 and -0', () => {
      expect(() => {
        // @ts-expect-error - desired behavior
        earl(+0).not.toExactlyEqual(-0)
      }).to.throw(
        'The value 0 is the exact same value as 0, but it was expected not to be.',
      )
    })

    it('passes for different reference', () => {
      expect(() => {
        earl({ a: 1 }).not.toExactlyEqual({ a: 1 })
      }).not.to.throw()
    })
  })
})
