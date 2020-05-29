import { expect } from 'chai'

import { StringMatchingMatcher } from '../../src/matchers/StringMatching'

describe('StringContaining matcher', () => {
  describe('with string', () => {
    it('matches strings containing substring', () => {
      const m = new StringMatchingMatcher('test')

      expect(m.check('abc test cde')).to.be.true
      expect(m.check('testtesttest')).to.be.true
    })

    it('doesnt match non-strings', () => {
      const m = new StringMatchingMatcher('test')

      expect(m.check(undefined)).to.be.false
      expect(m.check(1)).to.be.false
      expect(m.check({})).to.be.false
      expect(m.check([])).to.be.false
    })

    it('doesnt match strings not containing substring', () => {
      const m = new StringMatchingMatcher('test')

      expect(m.check('')).to.be.false
      expect(m.check('tes')).to.be.false
      expect(m.check('abc-acbc')).to.be.false
    })
  })

  describe('with regex', () => {
    it('matches strings matching pattern', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expect(m.check('1323')).to.be.true
      expect(m.check('1')).to.be.true
    })

    it('doesnt match non-strings', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expect(m.check(undefined)).to.be.false
      expect(m.check(1)).to.be.false
      expect(m.check({})).to.be.false
      expect(m.check([])).to.be.false
    })

    it('doesnt match strings not matching pattern', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expect(m.check('')).to.be.false
      expect(m.check('tes')).to.be.false
      expect(m.check('123a')).to.be.false
    })
  })
})
