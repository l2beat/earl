import { expect } from 'chai'

import { expect as earl } from '../expect'
import { ArrayOfLengthMatcher } from './ArrayOfLength'

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
      earl([1, 2, 3]).toEqual(earl.arrayOfLength(3))
      earl([1, 2, 3] as readonly number[]).toEqual(earl.arrayOfLength(3))
    })

    it('works with nested matchers', () => {
      earl({ arr: [1, 2, 3, 4, 5] }).toEqual({
        arr: earl.arrayOfLength(earl.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earl({ arr: [1, 2, 3] }).toEqual({
          arr: earl.arrayOfLength(earl.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw('{ arr: [1, 2, 3] } not equal to { arr: Matcher }')
    })
  })
})
