import { expect } from 'chai'

import { AStringContainingMatcher } from '../../../src/matchers/asymmetric/AStringContaining'

describe('AStringContaining matcher', () => {
  it('matches strings containing substring', () => {
    const anything = AStringContainingMatcher.make('test')

    expect(anything.check('abc test cde')).to.be.true
    expect(anything.check('testtesttest')).to.be.true
  })

  it('doesnt match non-strings', () => {
    const anything = AStringContainingMatcher.make('test')

    expect(anything.check(undefined)).to.be.false
    expect(anything.check(1)).to.be.false
    expect(anything.check({})).to.be.false
    expect(anything.check([])).to.be.false
  })

  it('doesnt match strings not containing substring', () => {
    const anything = AStringContainingMatcher.make('test')

    expect(anything.check('')).to.be.false
    expect(anything.check('tes')).to.be.false
    expect(anything.check('abc-acbc')).to.be.false
  })
})
