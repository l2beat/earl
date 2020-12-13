import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('number matchers', () => {
  describe('toBeGreaterThan', () => {
    describe('normal', () => {
      it('succeeds for a greater number', () => {
        expect(() => earl(2).toBeGreaterThan(1)).not.to.throw()
      })
  
      it('fails for an equal number', () => {
        expect(() => earl(3).toBeGreaterThan(3)).to.throw('3 is not greater than 3')
      })
  
      it('fails for a lesser number', () => {
        expect(() => earl(-2).toBeGreaterThan(4)).to.throw('-2 is not greater than 4')
      })
    })

    describe('negated', () => {
      it('fails for a greater number', () => {
        expect(() => earl(2).not.toBeGreaterThan(1)).to.throw('2 is greater than 1')
      })
  
      it('succeeds for an equal number', () => {
        expect(() => earl(3).not.toBeGreaterThan(3)).not.to.throw()
      })
  
      it('succeeds for a lesser number', () => {
        expect(() => earl(-2).not.toBeGreaterThan(4)).not.to.throw()
      })
    })
  })

  describe('toBeGreaterThanOrEqualTo', () => {
    describe('normal', () => {
      it('succeeds for a greater number', () => {
        expect(() => earl(2).toBeGreaterThanOrEqualTo(1)).not.to.throw()
      })
  
      it('succeeds for an equal number', () => {
        expect(() => earl(3).toBeGreaterThanOrEqualTo(3)).not.to.throw()
      })
  
      it('fails for a lesser number', () => {
        expect(() => earl(-2).toBeGreaterThanOrEqualTo(4)).to.throw('-2 is not greater than or equal to 4')
      })
    })

    describe('negated', () => {
      it('fails for a greater number', () => {
        expect(() => earl(2).not.toBeGreaterThanOrEqualTo(1)).to.throw('2 is greater than or equal to 1')
      })
  
      it('fails for an equal number', () => {
        expect(() => earl(3).not.toBeGreaterThanOrEqualTo(3)).to.throw('3 is greater than or equal to 3')
      })
  
      it('succeeds for a lesser number', () => {
        expect(() => earl(-2).not.toBeGreaterThanOrEqualTo(4)).not.to.throw()
      })
    })
  })

  describe('toBeLessThan', () => {
    describe('normal', () => {
      it('fails for a greater number', () => {
        expect(() => earl(2).toBeLessThan(1)).to.throw('2 is not less than 1')
      })
  
      it('fails for an equal number', () => {
        expect(() => earl(3).toBeLessThan(3)).to.throw('3 is not less than 3')
      })
  
      it('succeeds for a lesser number', () => {
        expect(() => earl(-2).toBeLessThan(4)).not.to.throw()
      })
    })

    describe('negated', () => {
      it('succeeds for a greater number', () => {
        expect(() => earl(2).not.toBeLessThan(1)).not.to.throw()
      })
  
      it('succeeds for an equal number', () => {
        expect(() => earl(3).not.toBeLessThan(3)).not.to.throw()
      })
  
      it('fails for a lesser number', () => {
        expect(() => earl(-2).not.toBeLessThan(4)).to.throw('-2 is less than 4')
      })
    })
  })

  describe('toBeLessThanOrEqualTo', () => {
    describe('normal', () => {
      it('fails for a greater number', () => {
        expect(() => earl(2).toBeLessThanOrEqualTo(1)).to.throw('2 is not less than or equal to 1')
      })
  
      it('succeeds for an equal number', () => {
        expect(() => earl(3).toBeLessThanOrEqualTo(3)).not.to.throw()
      })
  
      it('succeeds for a lesser number', () => {
        expect(() => earl(-2).toBeLessThanOrEqualTo(4)).not.to.throw()
      })
    })

    describe('negated', () => {
      it('succeeds for a greater number', () => {
        expect(() => earl(2).not.toBeLessThanOrEqualTo(1)).not.to.throw()
      })
  
      it('fails for an equal number', () => {
        expect(() => earl(3).not.toBeLessThanOrEqualTo(3)).to.throw('3 is less than or equal to 3')
      })
  
      it('fails for a lesser number', () => {
        expect(() => earl(-2).not.toBeLessThanOrEqualTo(4)).to.throw('-2 is less than or equal to 4')
      })
    })
  })
})
