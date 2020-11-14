import { expect } from 'chai'

import { expect as earl } from '../src/expect'

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
    expect(() => earl(1, { extraMessage: 'test assertion' }).toEqual(2)).to.throw(
      `1 not equal to 2
Extra message: test assertion`,
    )
  })
})
