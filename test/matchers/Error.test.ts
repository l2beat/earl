import { expect } from 'chai'

import { ErrorMatcher } from '../../src/matchers/Error'

describe('Error matcher', () => {
  it('matches errors with msgs', () => {
    const m = new ErrorMatcher('bye world')

    expect(m.check(new Error('bye world'))).to.be.true
  })

  it('doesnt match errors with different msgs', () => {
    const m = new ErrorMatcher('bye world')

    expect(m.check(new Error('hello world'))).to.be.false
  })

  it('doesnt match non-errors', () => {
    const m = new ErrorMatcher('bye world')

    expect(m.check('123')).to.be.false
  })
})
