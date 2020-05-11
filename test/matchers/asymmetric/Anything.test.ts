import { expect } from 'chai'

import { AnythingMatcher } from '../../../src/matchers/asymmetric/Anything'

describe('Anything asymmetric matcher', () => {
  it('should match anything', () => {
    const anything = AnythingMatcher.make()

    expect(anything.check('a')).to.be.true
    expect(anything.check(undefined)).to.be.true
    expect(anything.check(1)).to.be.true
    expect(anything.check({})).to.be.true
    expect(anything.check([])).to.be.true
  })
})
