import { expect } from 'chai'
import fc from 'fast-check'

import { expect as earl } from '../../src'
import { arbitraries } from '../arbitraries'
import { passes } from '../common'

describe('boolean validators', () => {
  describe('toBeTruthy', () => {
    it('normal', () => {
      expect(() => earl(true).toBeTruthy()).not.to.throw()
      expect(() => earl(0).toBeTruthy()).to.throw('0 is not truthy')
    })

    it('negated', () => {
      expect(() => earl(false).not.toBeTruthy()).not.to.throw()
      expect(() => earl(1).not.toBeTruthy()).to.throw('1 is truthy')
    })

    it('expect(x).toBeTruthy() passes if and only if Boolean(x) is true', () => {
      fc.assert(fc.property(arbitraries.anything, (x) => passes(() => earl(x).toBeTruthy()) === Boolean(x)))
    })
  })

  describe('toBeFalsy', () => {
    it('normal', () => {
      expect(() => earl(false).toBeFalsy()).not.to.throw()
      expect(() => earl(1).toBeFalsy()).to.throw('1 is not falsy')
    })

    it('negated', () => {
      expect(() => earl(true).not.toBeFalsy()).not.to.throw()
      expect(() => earl(0).not.toBeFalsy()).to.throw('0 is falsy')
    })

    it('expect(x).toBeFalsy() passes if and only if Boolean(x) is true', () => {
      fc.assert(fc.property(arbitraries.anything, (x) => passes(() => earl(x).toBeFalsy()) === !x))
    })
  })
})
