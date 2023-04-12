import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toBeASafeInteger } from './toBeASafeInteger.js'

describe(toBeASafeInteger.name, () => {
  describe('without .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).toBeASafeInteger()
      }).not.to.throw()
    })

    it('passes for 42n', () => {
      expect(() => {
        earl(BigInt(42)).toBeASafeInteger()
      }).not.to.throw()
    })

    it('fails for 12.5', () => {
      expect(() => {
        earl(12.5).toBeASafeInteger()
      }).to.throw(
        'The value 12.5 is not a safe integer, but it was expected to be a safe integer.',
      )
    })

    it('fails for Number.MAX_SAFE_INTEGER * 2', () => {
      expect(() => {
        earl(Number.MAX_SAFE_INTEGER * 2).toBeASafeInteger()
      }).to.throw(
        `The value ${
          Number.MAX_SAFE_INTEGER * 2
        } is not a safe integer, but it was expected to be a safe integer.`,
      )
    })
  })

  describe('with .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).not.toBeASafeInteger()
      }).to.throw(
        'The value 42 is a safe integer, but it was expected not to be a safe integer.',
      )
    })

    it('fails for 42n', () => {
      expect(() => {
        earl(BigInt(42)).not.toBeASafeInteger()
      }).to.throw(
        'The value 42n is a safe integer, but it was expected not to be a safe integer.',
      )
    })

    it('passes for 12.5', () => {
      expect(() => {
        earl(12.5).not.toBeASafeInteger()
      }).not.to.throw()
    })

    it('passes for Number.MAX_SAFE_INTEGER * 2', () => {
      expect(() => {
        earl(Number.MAX_SAFE_INTEGER * 2).not.toBeASafeInteger()
      }).not.to.throw()
    })
  })
})
