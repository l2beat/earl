import { expect } from 'chai'
import fc from 'fast-check'

import { arbitraries } from '../test/arbitraries'
import { FalsyMatcher, TruthyMatcher } from './booleans'

describe('boolean matchers', () => {
  describe('Truthy matcher', () => {
    const m = new TruthyMatcher()

    it('matches truthy values', () => {
      expect(m.check(4)).to.be.true
      expect(m.check(true)).to.be.true
      expect(m.check({})).to.be.true
      expect(m.check([])).to.be.true
    })

    it('does not match falsy values', () => {
      expect(m.check('')).to.be.false
      expect(m.check(0)).to.be.false
      expect(m.check(null)).to.be.false
      expect(m.check(undefined)).to.be.false
      expect(m.check(false)).to.be.false
    })

    it('check() returns true if and only if Boolean(x) is true', () => {
      fc.assert(
        fc.property(arbitraries.anything, (x) => m.check(x) === Boolean(x)),
      )
    })
  })

  describe('Falsy matcher', () => {
    const m = new FalsyMatcher()

    it('matches falsy values', () => {
      expect(m.check('')).to.be.true
      expect(m.check(0)).to.be.true
      expect(m.check(null)).to.be.true
      expect(m.check(undefined)).to.be.true
      expect(m.check(false)).to.be.true
    })

    it('does not match falsy values', () => {
      expect(m.check(4)).to.be.false
      expect(m.check(true)).to.be.false
      expect(m.check({})).to.be.false
      expect(m.check([])).to.be.false
    })

    it('check() returns true if and only if !x is true', () => {
      fc.assert(fc.property(arbitraries.anything, (x) => m.check(x) === !x))
    })
  })
})
