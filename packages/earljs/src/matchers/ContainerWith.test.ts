import { expect } from 'chai'

import { expect as earl } from '../expect'
import { ContainerWithMatcher } from './ContainerWith'

describe('ContainerWith matcher', () => {
  it('matches array', () => {
    const m = new ContainerWithMatcher([1])

    expect(m.check([1])).to.be.true
    expect(m.check([3, 2, 1])).to.be.true

    expect(m.check([])).to.be.false
    expect(m.check(['a'])).to.be.false
  })

  it('matches arrays with repeated items', () => {
    const m = new ContainerWithMatcher([1, 1])

    expect(m.check([1, 1])).to.be.true
    expect(m.check([1, 1, 1])).to.be.true
    expect(m.check([1, 0, 1])).to.be.true
    expect(m.check([1])).to.be.false
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
    it('works with array', () => {
      earl([1, 2, 3]).toEqual(earl.containerWith(3))
      earl([1, 2, 3]).toEqual(earl.containerWith(1, 2, 3))
      earl([1, 2, 3]).not.toEqual(earl.containerWith(1, 2, 3, 4, 5, 6))
    })

    it('works with sets', () => {
      earl(new Set([1, 2, 3])).toEqual(earl.containerWith(3))
      earl(new Set([1, 2, 3])).toEqual(earl.containerWith(1, 2, 3))
      earl(new Set([1, 2, 3])).not.toEqual(earl.containerWith(1, 2, 3, 4, 5, 6))
    })

    it('works with nested matchers', () => {
      earl({ arr: [1, 5, 10] }).toEqual({
        arr: earl.containerWith(earl.numberCloseTo(6, { delta: 1 })),
      })
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earl({ arr: [1, 2, 3] }).toEqual({
          arr: earl.containerWith(earl.numberCloseTo(6, { delta: 1 })),
        }),
      ).to.throw('{ arr: [1, 2, 3] } not equal to { arr: Matcher }')
    })
  })
})
