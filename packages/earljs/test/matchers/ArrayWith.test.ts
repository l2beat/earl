import { expect } from 'chai'
import { EOL } from 'os'

import { expect as earlExpect } from '../../src'
import { ArrayWithMatcher } from '../../src/matchers'

describe('ArrayWith matcher', () => {
  it('matches a single-element array', () => {
    const m = new ArrayWithMatcher([1])

    expect(m.check([])).to.be.false
    expect(m.check(['a'])).to.be.false
    expect(m.check([1])).to.be.true
    expect(m.check([1, 2, 3])).to.be.true
  })

  it('matches a multi-element array', () => {
    const m = new ArrayWithMatcher([1, 2, 3])

    expect(m.check([])).to.be.false
    expect(m.check(['a'])).to.be.false
    expect(m.check([1])).to.be.false
    expect(m.check([1, 2, 3])).to.be.true
    expect(m.check([1, 2, 3, 4, 5, 6])).to.be.true
  })

  it("doesn't match non iterables", () => {
    const m = new ArrayWithMatcher([1])

    expect(m.check({ something: 1 })).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(1)).to.be.false
  })

  it('matches repeated items', () => {
    const m = new ArrayWithMatcher([1, 1])

    expect(m.check([1, 1])).to.be.true
    expect(m.check([1, 1, 1])).to.be.true
    expect(m.check([1, 0, 1])).to.be.true
    expect(m.check([1])).to.be.false
  })

  describe('in expectation', () => {
    it('works', () => {
      earlExpect([1, 2, 3]).toEqual(earlExpect.arrayWith(3))
      earlExpect([1, 2, 3]).toEqual(earlExpect.arrayWith(1, 2, 3))
      earlExpect([1, 2, 3]).not.toEqual(earlExpect.arrayWith(1, 2, 3, 4, 5, 6))
    })

    it('works with nested matchers', () => {
      earlExpect({ arr: [5] }).toEqual({
        arr: earlExpect.arrayWith(earlExpect.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earlExpect({ arr: [1, 2, 3] }).toEqual({
          arr: earlExpect.arrayWith(earlExpect.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw(
        [
          '{"arr": [1, 2, 3]} not equal to {"arr": "[ArrayWith: [NumberCloseTo: 6, delta=1]]"}',
          'Hint: value mismatch',
        ].join(EOL),
      )
    })
  })
})
