import { expect } from 'earljs'

describe('example-plugin', () => {
  it('EvenNumberMatcher works', () => {
    expect(2).toEqual(expect.evenNumber())
  })

  it('EvenNumberMatchers is type safe', () => {
    // @ts-expect-error - type mismatch
    expect('2').not.toEqual(expect.evenNumber())
  })

  it('toBeEven works', () => {
    expect(2).toBeEven()
  })

  it('toBeEven is type safe', () => {
    // @ts-expect-error - type mismatch
    expect('foo').not.toBeEven()
  })
})
