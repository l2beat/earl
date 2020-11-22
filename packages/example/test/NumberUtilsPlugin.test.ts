import { expect } from 'earljs'

describe('NumberUtilsPlugin', () => {
  it('EvenNumberMatcher works', () => {
    expect(2).toEqual(expect.evenNumber())
  })

  it('EvenNumberMatchers is typesafe', () => {
    // it's typesafe! this is a compile time error
    // @ts-expect-error
    expect(() => expect('2').toEqual(expect.evenNumber())).toThrow(
      expect.stringMatching('"2" not equal to "[EvenNumberMatcher]"'),
    )
  })

  it('toBeEven works', () => {
    expect(2).toBeEven()
  })

  it('smartEq was poisoned with evil comparison', () => {
    expect(() => expect(2).toEqual(2)).toThrow()
  })
})
