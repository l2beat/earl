import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeCloseTo } from './toBeCloseTo'

describe(toBeCloseTo.name, () => {
  describe('without .not', () => {
    it('passes for a number close to the target', () => {
      expect(() => {
        earl(1.1).toBeCloseTo(1, 0.2)
      }).not.to.throw()
    })

    it('fails for a number outside the range', () => {
      expect(() => {
        earl(1.5).toBeCloseTo(1, 0.2)
      }).to.throw("1.5 isn't close to 1 +/- 0.2")
    })
  })

  describe('with .not', () => {
    it('fails for a number close to the target', () => {
      expect(() => {
        earl(1.1).not.toBeCloseTo(1, 0.2)
      }).to.throw('1.1 is close to 1 +/- 0.2')
    })

    it('passes for a number outside the range', () => {
      expect(() => {
        earl(1.5).not.toBeCloseTo(1, 0.2)
      }).not.to.throw()
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(1.1).toBeCloseTo(1, 0.2)
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toBeCloseTo(1, 0.2)
    })
  })
})
