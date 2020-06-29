import { expect } from 'chai'

import { expect as earl } from '../../src'
import { mockFn } from '../../src/mocks/strictMock'

describe('strictMock', () => {
  describe('behaviour', () => {
    it('works', () => {
      const mock = mockFn<[number], string>()

      mock.expectedCall([1]).returns('a')
      mock.expectedCall([2]).returns('b')
      mock.expectedCall([earl.a(Number)]).returns('c')

      expect(mock(1)).to.be.eq('a')
      expect(mock(2)).to.be.eq('b')
      expect(mock(5)).to.be.eq('c')
      expect(() => mock(3)).to.throw('Unexpected call!')
      expect(() => earl(mock).toBeExhausted()).not.to.throw()
    })
  })

  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = mockFn<[], void>()
      expect(fn).to.be.instanceOf(Function)
    })

    it('function throws by default', () => {
      const fn = mockFn<[], void>()

      expect(() => fn()).to.throw('Unexpected call! Called with []')
    })
  })

  describe('.expectedCall', () => {
    it('supports .returns', () => {
      const fn = mockFn<[number, number], number>().expectedCall([1, 2]).returns(3)

      expect(() => fn(2, 2)).to.throw('Unexpected call! Expected [1, 2] but was called with [2, 2]')
      expect(fn(1, 2)).to.equal(3)
      expect(() => fn(2, 2)).to.throw('Unexpected call! Called with [2, 2]')
    })

    it('supports .throws', () => {
      const fn = mockFn<[number, number], number>().expectedCall([1, 2]).throws(new Error('Boom'))

      expect(() => fn(1, 2)).to.throw('Boom')
      expect(() => fn(2, 2)).to.throw('Unexpected call! Called with [2, 2]')
    })

    it('supports .executes', () => {
      const fn = mockFn<[number, number], number>()
        .expectedCall([1, 2])
        .executes((a, b) => a + b)

      expect(fn(1, 2)).to.equal(3)
      expect(() => fn(2, 2)).to.throw('Unexpected call! Called with [2, 2]')
    })

    it('supports matchers', () => {
      const fn = mockFn<[number], number>()
        .expectedCall([earl.a(Number)])
        .returns(3)

      expect(fn(420)).to.equal(3)
      expect(() => fn(2)).to.throw('Unexpected call! Called with [2]')
    })
  })

  describe('.isExhausted', () => {
    it('returns true initially', () => {
      const fn = mockFn<[number], number>()
      expect(fn.isExhausted()).to.equal(true)
    })

    it('returns false if there are queued calls', () => {
      const fn = mockFn<[number], number>().expectedCall([3]).returns(0)

      expect(fn.isExhausted()).to.equal(false)

      fn(3)

      expect(fn.isExhausted()).to.equal(true)
    })
  })
})
