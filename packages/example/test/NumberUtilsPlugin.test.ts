import { expect } from 'earljs'

describe('NumberUtilsPlugin', () => {
  it('EvenNumberMatcher works', () => {
    expect(2).toEqual(expect.evenNumber())

    // it's typesafe! this is a compile time error
    // expect('2').toEqual(expect.evenNumber())
  })

  it('toBeEven works', () => {
    expect(2).toBeEven()
  })

  it('smartEq was poisoned with evil comparison', () => {
    expect(() => expect(2).toEqual(2)).toThrow()
  })
})
