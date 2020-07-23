import { expect as expectEarl } from '../../src'
import { NumberCloseToMatcher } from '../../src/matchers/NumberCloseTo'

describe('NumberCloseTo matcher', () => {
  it('matches numbers in within delta', () => {
    const m = new NumberCloseToMatcher(42, 5)

    expectEarl(m.check(37)).toEqual(true)
    expectEarl(m.check(47)).toEqual(true)
    expectEarl(m.check(43)).toEqual(true)
    expectEarl(m.check(46)).toEqual(true)
  })

  it('matches numbers in within small delta', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expectEarl(m.check(42.01)).toEqual(true)
  })

  it('matches exact numbers', () => {
    const m = new NumberCloseToMatcher(42, 5)

    expectEarl(m.check(42)).toEqual(true)
  })

  it('doesnt match numbers outside delta', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expectEarl(m.check(44)).toEqual(false)
    expectEarl(m.check(40)).toEqual(false)
  })

  it('doesnt match non-numbers', () => {
    const m = new NumberCloseToMatcher(42, 1)

    expectEarl(m.check('a')).toEqual(false)
    expectEarl(m.check(undefined)).toEqual(false)
  })
})
