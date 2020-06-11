import { expect } from 'chai'

import { looseMockFn } from '../../src/mocks/looseMock'

describe('looseMock', () => {
  describe('behaviour', () => {
    it('works', () => {
      const mock = looseMockFn(() => 42)

      expect(mock(1)).to.be.eq(42)
      expect(mock(2)).to.be.eq(42)
      expect(mock()).to.be.eq(42)

      expect(mock.calls).to.be.deep.eq([[1], [2], []])
    })
  })

  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = looseMockFn(() => {})
      expect(fn).to.be.instanceOf(Function)
    })

    it('function returns whatever default impl returns', () => {
      const fn = looseMockFn(() => undefined)

      expect(fn()).to.equal(undefined)
    })
  })

  describe('.calls', () => {
    it('is empty at first', () => {
      const fn = looseMockFn(() => 5)
      expect(fn.calls).to.deep.equal([])
    })

    it('stores a single call', () => {
      const fn = looseMockFn(() => {})
      fn()
      expect(fn.calls).to.deep.equal([[]])
    })

    it('stores multiple calls', () => {
      const fn = looseMockFn(() => {})
      fn()
      fn(1)
      fn(5, 'yo')
      expect(fn.calls).to.deep.equal([[], [1], [5, 'yo']])
    })

    it('respects .throws', () => {
      const error = new Error('Boom')
      const fn = looseMockFn(() => {
        throw error
      })
      try {
        fn()
      } catch {}
      expect(fn.calls).to.deep.equal([[]])
    })
  })
})
