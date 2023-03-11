import { expect } from 'chai'
import { EOL } from 'os'

import { expect as earl, loadMatchers } from '../src/expect'
import { AnythingMatcher } from '../src/matchers'
import { clearModuleCache } from './common'

describe('Expectation', () => {
  // used for integration tests for all matchers
  it('works with ALL matchers', () => {
    const data = {
      number: 10,
      string: 'John Doe',
      complexData: {
        nothing: 'important',
      },
      reallyAnything: undefined,
    }

    earl(data).toEqual({
      number: earl.numberCloseTo(10, { delta: 2 }),
      string: earl.stringMatching('John'),
      complexData: earl.a(Object),
      reallyAnything: earl.anything(),
    })
  })

  it('works with extraMessage', () => {
    expect(() =>
      earl(1, { extraMessage: 'test assertion' }).toEqual(2),
    ).to.throw(['1 not equal to 2', 'Extra message: test assertion'].join(EOL))
  })

  type expectType = typeof expect
  type loadMatchersType = typeof loadMatchers
  describe('plugin', () => {
    let earl: expectType
    let loadMatchers: loadMatchersType
    beforeEach(function () {
      this.timeout(5_000)
      clearModuleCache()
      ;({ expect: earl, loadMatchers } = require('../src/expect'))
    })

    afterEach(clearModuleCache)

    it('adds new matchers', () => {
      loadMatchers({ totallyNewMatcher: () => new AnythingMatcher() })

      expect((earl as any).totallyNewMatcher).to.be.instanceOf(Function)
    })

    it('clears cache correctly', () => {
      expect((earl as any).totallyNewMatcher).to.be.undefined
    })
  })
})
