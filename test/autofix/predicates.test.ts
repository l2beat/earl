import { expect as expectEarl } from '../../src'
import { shouldPreventAutofix } from '../../src/autofix/predicates'

describe('autofix > shouldPreventAutofix', () => {
  it('prevents running on CI', () => {
    const dummyEnv = {
      CI: '1',
    }
    expectEarl(shouldPreventAutofix(dummyEnv)()).toEqual(true)
  })

  it(`doesn't prevent in normal situation`, () => {
    const dummyEnv = {}

    expectEarl(shouldPreventAutofix(dummyEnv)()).toEqual(false)
  })
})
