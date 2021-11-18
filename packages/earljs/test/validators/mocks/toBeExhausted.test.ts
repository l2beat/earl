import { expect } from 'chai'

import { expect as earl } from '../../../src'
import { mockFn } from '../../../src/mocks'

describe('toBeExhausted', () => {
  describe('not negated', () => {
    it('works with exhausted mocks', () => {
      const mock = mockFn()

      expect(() => earl(mock).toBeExhausted()).not.to.throw()
    })

    it('throws with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.given(1).returnsOnce(1)

      expect(() => earl(mock).toBeExhausted()).to.throw('Mock not exhausted!')
    })

    it('works with multiple .given overrides in the queue', () => {
      const square = mockFn<(x: number) => number>()
        .given(2)
        .returnsOnce(4)
        .given(3)
        .returnsOnce(9)
        .given(4)
        .returnsOnce(16)

      expect(square(2)).to.eq(4)
      expect(square(3)).to.eq(9)
      expect(() => earl(square).toBeExhausted()).to.throw('Mock not exhausted!')
      expect(square(4)).to.eq(16)
      expect(() => earl(square).toBeExhausted()).not.to.throw()
    })
  })

  describe('negated', () => {
    it('throws with exhausted mocks', () => {
      const mock = mockFn()

      expect(() => earl(mock).not.toBeExhausted()).to.throw('Mock exhausted!')
    })

    it('works with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.given(1).returnsOnce(1)

      expect(() => earl(mock).not.toBeExhausted()).not.to.throw()
    })
  })
})
