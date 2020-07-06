import { expect as expectEarl } from '../../src'
import { looseMockFn } from '../../src/mocks/looseMock'

describe('looseMock', () => {
  describe('behaviour', () => {
    it('works', () => {
      const mock = looseMockFn(() => 42)

      expectEarl(mock(1)).toEqual(42)
      expectEarl(mock(2)).toEqual(42)
      expectEarl(mock()).toEqual(42)

      expectEarl(mock.calls).toEqual([[1], [2], []])
    })
  })

  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = looseMockFn(() => {})
      expectEarl(fn).toEqual(expectEarl.a(Function))
    })

    it('function returns whatever default impl returns', () => {
      const fn = looseMockFn(() => undefined)

      expectEarl(fn()).toEqual(undefined)
    })
  })

  describe('.calls', () => {
    it('is empty at first', () => {
      const fn = looseMockFn(() => 5)
      expectEarl(fn.calls).toEqual([])
    })

    it('stores a single call', () => {
      const fn = looseMockFn(() => {})
      fn()
      expectEarl(fn.calls).toEqual([[]])
    })

    it('stores multiple calls', () => {
      const fn = looseMockFn(() => {})
      fn()
      fn(1)
      fn(5, 'yo')
      expectEarl(fn.calls).toEqual([[], [1], [5, 'yo']])
    })

    it('respects .throws', () => {
      const error = new Error('Boom')
      const fn = looseMockFn(() => {
        throw error
      })
      try {
        fn()
      } catch {}
      expectEarl(fn.calls).toEqual([[]])
    })
  })
})
