import { expect } from 'chai'

import { expect as earl } from '../../src'
import { mockFn } from '../../src/mocks/strictMock'

describe('toBeExhausted', () => {
  describe('not negated', () => {
    it('works with exhausted mocks', () => {
      const mock = mockFn()

      expect(() => earl(mock).toBeExhausted()).not.to.throw()
    })

    it('throws with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.expectedCall([1]).returns(1)

      expect(() => earl(mock).toBeExhausted()).to.throw('Mock not exhausted!')
    })
  })

  describe('negated', () => {
    it('throws with exhausted mocks', () => {
      const mock = mockFn()

      expect(() => earl(mock).not.toBeExhausted()).to.throw('Mock exhausted!')
    })

    it('works with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.expectedCall([1]).returns(1)

      expect(() => earl(mock).not.toBeExhausted()).not.to.throw()
    })
  })
})
