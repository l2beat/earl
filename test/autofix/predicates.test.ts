import { expect } from 'chai'

import { shouldPreventAutofix } from '../../src/autofix/predicates'

describe('autofix > shouldPreventAutofix', () => {
  it('prevents running on CI', () => {
    const dummyEnv = {
      CI: '1',
    }
    expect(shouldPreventAutofix(dummyEnv)()).to.be.true
  })

  it(`doesn't prevent in normal situation`, () => {
    const dummyEnv = {}

    expect(shouldPreventAutofix(dummyEnv)()).to.be.false
  })
})
