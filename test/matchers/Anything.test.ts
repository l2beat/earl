import { expect } from 'chai'

import { AnythingMatcher } from '../../src/matchers/Anything'

describe('Anything asymmetric matcher', () => {
  it('should match anything', () => {
    const m = AnythingMatcher.make()

    expect(m.check('a')).to.be.true
    expect(m.check(undefined)).to.be.true
    expect(m.check(1)).to.be.true
    expect(m.check({})).to.be.true
    expect(m.check([])).to.be.true
  })
})
