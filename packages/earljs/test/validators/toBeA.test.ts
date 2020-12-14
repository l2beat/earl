import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toBeA validator', () => {
  describe('normal', () => {
    it('matches', () => {
      earl('abc').toBeA(String)
    })

    it('throws', () => {
      expect(() => earl(1).toBeA(String)).to.throw('1 is not a instance of [Function String]')
    })
  })

  describe('negated', () => {
    it("doesn't matches", () => {
      earl('abc').not.toBeA(Number)
    })

    it('throws', () => {
      expect(() => earl(1).not.toBeA(Number)).to.throw('1 is a instance of [Function Number]')
    })
  })
})
