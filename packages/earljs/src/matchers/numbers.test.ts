import { expect } from 'chai'

import {
  NumberGreaterThanMatcher,
  NumberGreaterThanOrEqualToMatcher,
  NumberLessThanMatcher,
  NumberLessThanOrEqualToMatcher,
} from './numbers'

describe('number matchers', () => {
  describe('NumberGreaterThan matcher', () => {
    it('matches numbers that are greater', () => {
      const m = new NumberGreaterThanMatcher(3)
      expect(m.check(4)).to.be.true
    })

    it('does not match numbers that are equal', () => {
      const m = new NumberGreaterThanMatcher(3)
      expect(m.check(3)).to.be.false
    })

    it('does not match numbers that are lesser', () => {
      const m = new NumberGreaterThanMatcher(3)
      expect(m.check(2)).to.be.false
    })
  })

  describe('NumberGreaterThanOrEqualTo matcher', () => {
    it('matches numbers that are greater', () => {
      const m = new NumberGreaterThanOrEqualToMatcher(3)
      expect(m.check(4)).to.be.true
    })

    it('matches numbers that are equal', () => {
      const m = new NumberGreaterThanOrEqualToMatcher(3)
      expect(m.check(3)).to.be.true
    })

    it('does not match numbers that are lesser', () => {
      const m = new NumberGreaterThanOrEqualToMatcher(3)
      expect(m.check(2)).to.be.false
    })
  })

  describe('NumberLessThan matcher', () => {
    it('does not match numbers that are greater', () => {
      const m = new NumberLessThanMatcher(3)
      expect(m.check(4)).to.be.false
    })

    it('does not match numbers that are equal', () => {
      const m = new NumberLessThanMatcher(3)
      expect(m.check(3)).to.be.false
    })

    it('matches numbers that are lesser', () => {
      const m = new NumberLessThanMatcher(3)
      expect(m.check(2)).to.be.true
    })
  })

  describe('NumberLessThanOrEqualTo matcher', () => {
    it('does not match numbers that are greater', () => {
      const m = new NumberLessThanOrEqualToMatcher(3)
      expect(m.check(4)).to.be.false
    })

    it('matches numbers that are equal', () => {
      const m = new NumberLessThanOrEqualToMatcher(3)
      expect(m.check(3)).to.be.true
    })

    it('matches numbers that are lesser', () => {
      const m = new NumberLessThanOrEqualToMatcher(3)
      expect(m.check(2)).to.be.true
    })
  })
})
