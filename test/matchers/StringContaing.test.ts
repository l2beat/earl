import { expect } from 'chai'

import { StringContainingMatcher } from '../../src/matchers/StringContaining'

describe('StringContaining matcher', () => {
  it('matches strings containing substring', () => {
    const m = new StringContainingMatcher('test')

    expect(m.check('abc test cde')).to.be.true
    expect(m.check('testtesttest')).to.be.true
  })

  it('doesnt match non-strings', () => {
    const m = new StringContainingMatcher('test')

    expect(m.check(undefined)).to.be.false
    expect(m.check(1)).to.be.false
    expect(m.check({})).to.be.false
    expect(m.check([])).to.be.false
  })

  it('doesnt match strings not containing substring', () => {
    const m = new StringContainingMatcher('test')

    expect(m.check('')).to.be.false
    expect(m.check('tes')).to.be.false
    expect(m.check('abc-acbc')).to.be.false
  })
})
