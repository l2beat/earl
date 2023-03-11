import { expect } from 'chai'
import fc from 'fast-check'

import { arbitraries } from '../test/arbitraries'
import { DefinedMatcher, NullishMatcher } from './optionals'

describe('optional matchers', () => {
  describe('Defined matcher', () => {
    const m = new DefinedMatcher()

    it('matches defined values', () => {
      expect(m.check(0)).to.be.true
      expect(m.check(1)).to.be.true
      expect(m.check(false)).to.be.true
      expect(m.check(true)).to.be.true
    })

    it('does not match undefined and null', () => {
      expect(m.check(undefined)).to.be.false
      expect(m.check(null)).to.be.false
    })

    it('check() returns true if and only if x != null', () => {
      fc.assert(
        fc.property(arbitraries.anything, (x) => m.check(x) === (x != null)),
      )
    })
  })

  describe('Nullish matcher', () => {
    const m = new NullishMatcher()

    it('matches undefined and null', () => {
      expect(m.check(undefined)).to.be.true
      expect(m.check(null)).to.be.true
    })

    it('does not match defined values', () => {
      expect(m.check(0)).to.be.false
      expect(m.check(1)).to.be.false
      expect(m.check(false)).to.be.false
      expect(m.check(true)).to.be.false
    })

    it('check() returns true if and only if x == null', () => {
      fc.assert(
        fc.property(arbitraries.anything, (x) => m.check(x) === (x == null)),
      )
    })
  })
})
