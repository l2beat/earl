import { expect as expectEarl } from '../../src'
import { AnythingMatcher } from '../../src/matchers/Anything'

describe('Anything matcher', () => {
  it('should match anything', () => {
    const m = new AnythingMatcher()

    expectEarl(m.check('a')).toEqual(true)
    expectEarl(m.check(undefined)).toEqual(true)
    expectEarl(m.check(1)).toEqual(true)
    expectEarl(m.check({})).toEqual(true)
    expectEarl(m.check([])).toEqual(true)
  })
})
