import { expect } from 'earljs'

describe('example-plugin', () => {
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

  describe('smartEq rules', () => {
    it('smartEq was poisoned with evil comparison — 2 does not equal 2 anymore!', () => {
      expect(() => expect(2).toEqual(2)).toThrow()
    })

    it('a set can is now equal to array if they contain the same elements', () => {
      expect(new Set([1, 2, 3])).toEqual([1, 2, 3])
    })
  })
})
