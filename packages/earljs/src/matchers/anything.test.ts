import { expect } from 'chai'
import { AnythingMatcher } from './anything'

describe('Anything matcher', () => {
  it('should match anything', () => {
    const m = new AnythingMatcher()

    expect(m.check('a')).to.be.true
    expect(m.check(undefined)).to.be.true
    expect(m.check(1)).to.be.true
    expect(m.check({})).to.be.true
    expect(m.check([])).to.be.true
  })
})
