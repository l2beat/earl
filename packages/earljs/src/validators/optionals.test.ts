import { expect } from 'chai'
import fc from 'fast-check'

import { expect as earl } from '../expect'
import { arbitraries } from '../test/arbitraries'
import { passes } from '../test/common'

describe('optional validators', () => {
  describe('toBeDefined', () => {
    it('normal', () => {
      expect(() => earl(0).toBeDefined()).not.to.throw()
      expect(() => earl(null).toBeDefined()).to.throw('null is not defined')
    })

    it('negated', () => {
      expect(() => earl(undefined).not.toBeDefined()).not.to.throw()
      expect(() => earl(1).not.toBeDefined()).to.throw('1 is defined')
    })

    it('expect(x).toBeDefined() passes if and only if x != null', () => {
      fc.assert(
        fc.property(
          arbitraries.anything,
          (x) => passes(() => earl(x).toBeDefined()) === (x != null),
        ),
      )
    })
  })

  describe('toBeNullish', () => {
    it('normal', () => {
      expect(() => earl(null).toBeNullish()).not.to.throw()
      expect(() => earl(1).toBeNullish()).to.throw('1 is not nullish')
    })

    it('negated', () => {
      expect(() => earl(false).not.toBeNullish()).not.to.throw()
      expect(() => earl(null).not.toBeNullish()).to.throw('null is nullish')
    })

    it('expect(x).toBeNullish() passes if and only if x == null', () => {
      fc.assert(
        fc.property(
          arbitraries.anything,
          (x) => passes(() => earl(x).toBeNullish()) === (x == null),
        ),
      )
    })
  })
})
