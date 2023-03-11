import { expect } from 'chai'

import { expect as earl } from '../expect'
import { ArrayWithMatcher } from './ArrayWith'

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
      earl([1, 2, 3]).toEqual(earl.arrayWith(3))
      earl([1, 2, 3]).toEqual(earl.arrayWith(1, 2, 3))
      earl([1, 2, 3]).not.toEqual(earl.arrayWith(1, 2, 3, 4, 5, 6))
    })

    it('works with nested matchers', () => {
      earl({ arr: [5] }).toEqual({
        arr: earl.arrayWith(earl.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earl({ arr: [1, 2, 3] }).toEqual({
          arr: earl.arrayWith(earl.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw('{ arr: [1, 2, 3] } not equal to { arr: Matcher }')
    })
  })
})
