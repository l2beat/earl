import { expect } from 'chai'

import { expect as earlExpect } from '../../src/'
import { ArrayContainingMatcher } from '../../src/matchers/ArrayContaining'

describe('ArrayContaining matcher', () => {
  it('matches array', () => {
    const m = new ArrayContainingMatcher(1)

    expect(m.check([1])).to.be.true
    expect(m.check([3, 2, 1])).to.be.true

    expect(m.check([])).to.be.false
    expect(m.check(['a'])).to.be.false
  })

  it('matches sets', () => {
    const m = new ArrayContainingMatcher(1)

    expect(m.check(new Set().add(1))).to.be.true
    expect(m.check(new Set().add(3).add(2).add(1))).to.be.true

    expect(m.check(new Set())).to.be.false
    expect(m.check(new Set().add('a'))).to.be.false
  })

  it("doesn't match non iterables", () => {
    const m = new ArrayContainingMatcher(1)

    expect(m.check({ something: 1 })).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(1)).to.be.false
  })

  describe('in expectation', () => {
    it('works', () => {
      earlExpect([1, 2, 3]).toEqual(earlExpect.arrayContaining(3))
    })

    it('works with nested matchers', () => {
      earlExpect({ arr: [1, 5, 10] }).toEqual({
        arr: earlExpect.arrayContaining(earlExpect.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earlExpect({ arr: [1, 2, 3] }).toEqual({
          arr: earlExpect.arrayContaining(earlExpect.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw(`{"arr": [1, 2, 3]} not equal to {"arr": "[ArrayContaining: [NumberCloseTo: 6, delta=1]]"}
Hint: value mismatch`)
    })
  })
})
