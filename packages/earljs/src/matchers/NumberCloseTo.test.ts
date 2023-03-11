import { expect } from 'chai'

import { NumberCloseToMatcher } from './NumberCloseTo'

describe('NumberCloseTo matcher', () => {
  it('matches numbers in within delta', () => {
    const m = new NumberCloseToMatcher(42, 5)

    expect(m.check(37)).to.be.true
    expect(m.check(47)).to.be.true
    expect(m.check(43)).to.be.true
    expect(m.check(46)).to.be.true
  })

  it('matches numbers in within small delta', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expect(m.check(42.01)).to.be.true
  })

  it('matches exact numbers', () => {
    const m = new NumberCloseToMatcher(42, 5)

    expect(m.check(42)).to.be.true
  })

  it('doesnt match numbers outside delta', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expect(m.check(44)).to.be.false
    expect(m.check(40)).to.be.false
  })

  it('doesnt match non-numbers', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expect(m.check('a')).to.be.false
    expect(m.check(undefined)).to.be.false
  })
})
