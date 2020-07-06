import { expect as earl, expect as expectEarl } from '../../src'
import { mockFn } from '../../src/mocks/strictMock'

describe('strictMock', () => {
  describe('behaviour', () => {
    it('works', () => {
      const mock = mockFn<[number], string>()

      mock.expectedCall([1]).returns('a')
      mock.expectedCall([2]).returns('b')
      mock.expectedCall([earl.a(Number)]).returns('c')

      expectEarl(mock(1)).toEqual('a')
      expectEarl(mock(2)).toEqual('b')
      expectEarl(mock(5)).toEqual('c')
      expectEarl(() => mock(3)).toThrow(expectEarl.error('Unexpected call! Called with [3]'))
      expectEarl(() => earl(mock).toBeExhausted()).not.toThrow()
    })
  })

  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = mockFn<[], void>()
      expectEarl(fn).toEqual(expectEarl.a(Function))
    })

    it('function throws by default', () => {
      const fn = mockFn<[], void>()

      expectEarl(() => fn()).toThrow(expectEarl.error('Unexpected call! Called with []'))
    })
  })

  describe('.expectedCall', () => {
    it('supports .returns', () => {
      const fn = mockFn<[number, number], number>().expectedCall([1, 2]).returns(3)

      expectEarl(() => fn(2, 2)).toThrow(
        expectEarl.error('Unexpected call! Expected [1, 2] but was called with [2, 2]'),
      )
      expectEarl(fn(1, 2)).toEqual(3)
      expectEarl(() => fn(2, 2)).toThrow(expectEarl.error('Unexpected call! Called with [2, 2]'))
    })

    it('supports .throws', () => {
      const fn = mockFn<[number, number], number>().expectedCall([1, 2]).throws(new Error('Boom'))

      expectEarl(() => fn(1, 2)).toThrow(expectEarl.error('Boom'))
      expectEarl(() => fn(2, 2)).toThrow(expectEarl.error('Unexpected call! Called with [2, 2]'))
    })

    it('supports .executes', () => {
      const fn = mockFn<[number, number], number>()
        .expectedCall([1, 2])
        .executes((a, b) => a + b)

      expectEarl(fn(1, 2)).toEqual(3)
      expectEarl(() => fn(2, 2)).toThrow(expectEarl.error('Unexpected call! Called with [2, 2]'))
    })

    it('supports matchers', () => {
      const fn = mockFn<[number], number>()
        .expectedCall([earl.a(Number)])
        .returns(3)

      expectEarl(fn(420)).toEqual(3)
      expectEarl(() => fn(2)).toThrow(expectEarl.error('Unexpected call! Called with [2]'))
    })
  })

  describe('.isExhausted', () => {
    it('returns true initially', () => {
      const fn = mockFn<[number], number>()
      expectEarl(fn.isExhausted()).toEqual(true)
    })

    it('returns false if there are queued calls', () => {
      const fn = mockFn<[number], number>().expectedCall([3]).returns(0)

      expectEarl(fn.isExhausted()).toEqual(false)

      fn(3)

      expectEarl(fn.isExhausted()).toEqual(true)
    })
  })
})
