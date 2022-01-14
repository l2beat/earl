import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toBeA validator', () => {
  describe('normal', () => {
    it('matches', () => {
      earl('abc').toBeA(String)
    })

    it('throws primitive', () => {
      expect(() => earl(1).toBeA(String)).to.throw('1 is not a string')
    })

    it('throws class', () => {
      expect(() => earl(1).toBeA(class Foo {})).to.throw('1 is not an instance of class Foo')
    })
  })

  describe('negated', () => {
    it("doesn't matches", () => {
      earl('abc').not.toBeA(Number)
    })

    it('throws', () => {
      expect(() => earl(1).not.toBeA(Number)).to.throw('1 is a number')
    })

    it('throws', () => {
      class Foo {}
      expect(() => earl(new Foo()).not.toBeA(Foo)).to.throw('{} is an instance of class Foo')
    })
  })
})
