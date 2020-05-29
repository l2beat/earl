import { expect } from '../src/expect'

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

    expect(data).toEqual({
      number: expect.numberCloseTo(10, 2),
      string: expect.stringMatching('John'),
      complexData: expect.a(Object),
      reallyAnything: expect.anything(),
    })
  })
})
