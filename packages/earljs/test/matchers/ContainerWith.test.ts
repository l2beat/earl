import { expect } from 'chai'

import { expect as earlExpect } from '../../src'
import { ContainerWithMatcher } from '../../src/matchers/ContainerWith'

describe('ContainerWith matcher', () => {
  it('matches array', () => {
    const m = new ContainerWithMatcher([1])

    expect(m.check([1])).to.be.true
    expect(m.check([3, 2, 1])).to.be.true

    expect(m.check([])).to.be.false
    expect(m.check(['a'])).to.be.false
  })

  it('matches sets', () => {
    const m = new ContainerWithMatcher([1])

    expect(m.check(new Set().add(1))).to.be.true
    expect(m.check(new Set().add(3).add(2).add(1))).to.be.true

    expect(m.check(new Set())).to.be.false
    expect(m.check(new Set().add('a'))).to.be.false
  })

  it("doesn't match non iterables", () => {
    const m = new ContainerWithMatcher([1])

    expect(m.check({ something: 1 })).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(1)).to.be.false
  })

  describe('in expectation', () => {
    it('works', () => {
      earlExpect([1, 2, 3]).toEqual(earlExpect.containerWith(3))
      earlExpect([1, 2, 3]).toEqual(earlExpect.containerWith(1, 2, 3))
      earlExpect([1, 2, 3]).not.toEqual(earlExpect.containerWith(1, 2, 3, 4, 5, 6))
    })

    it('works with nested matchers', () => {
      earlExpect({ arr: [1, 5, 10] }).toEqual({
        arr: earlExpect.containerWith(earlExpect.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earlExpect({ arr: [1, 2, 3] }).toEqual({
          arr: earlExpect.containerWith(earlExpect.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw(`{"arr": [1, 2, 3]} not equal to {"arr": "[ContainerWith: [NumberCloseTo: 6, delta=1]]"}
Hint: value mismatch`)
    })
  })
})
