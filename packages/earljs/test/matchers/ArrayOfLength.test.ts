import { expect } from 'chai'

import { expect as earlExpect } from '../../src'
import { ArrayOfLengthMatcher } from '../../src/matchers/ArrayOfLength'

describe('ArrayOfLength matcher', () => {
  it('matches arrays', () => {
    const m = new ArrayOfLengthMatcher(2)

    expect(m.check([])).to.be.false
    expect(m.check([1])).to.be.false
    expect(m.check([1, 2, 3])).to.be.false
    expect(m.check([1, 5])).to.be.true
    expect(m.check([1, 5])).to.be.true
  })

  it('doesnt match non arrays', () => {
    const m = new ArrayOfLengthMatcher(1)

    expect(m.check(new Set())).to.be.false
    expect(m.check({})).to.be.false
    expect(m.check(1)).to.be.false
  })

  describe('in expectation', () => {
    it('works', () => {
      earlExpect([1, 2, 3]).toEqual(earlExpect.arrayOfLength(3))
      earlExpect([1, 2, 3] as ReadonlyArray<number>).toEqual(earlExpect.arrayOfLength(3))
    })

    it('works with nested matchers', () => {
      earlExpect({ arr: [1, 2, 3, 4, 5] }).toEqual({
        arr: earlExpect.arrayOfLength(earlExpect.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earlExpect({ arr: [1, 2, 3] }).toEqual({
          arr: earlExpect.arrayOfLength(earlExpect.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw('{ arr: [1, 2, 3] } not equal to { arr: Matcher }')
    })
  })
})
