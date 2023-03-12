import { expect } from 'earljs'

describe('example-plugin', () => {
  it('EvenNumberMatcher works', () => {
    expect(2).toEqual(expect.evenNumber())
  })

  it('EvenNumberMatchers is type safe', () => {
    // @ts-expect-error - type mismatch
    expect(() => expect('2').toEqual(expect.evenNumber())).toThrow(
      expect.stringMatching('"2" not equal to Matcher [EvenNumberMatcher]'),
    )
  })

  it('toBeEven works', () => {
    expect(2).toBeEven()
  })

  it('toBeEven is type safe', () => {
    // @ts-expect-error - type mismatch
    expect('foo').not.toBeEven()
  })
})
