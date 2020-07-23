import { expect as earl, expect as expectEarl } from '../../../src'
import { mockFn } from '../../../src/mocks/strictMock'

describe('toBeExhausted', () => {
  describe('not negated', () => {
    it('works with exhausted mocks', () => {
      const mock = mockFn()

      expectEarl(() => earl(mock).toBeExhausted()).not.toThrow()
    })

    it('throws with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.expectedCall([1]).returns(1)

      expectEarl(() => earl(mock).toBeExhausted()).toThrow(expectEarl.error('Mock not exhausted!'))
    })
  })

  describe('negated', () => {
    it('throws with exhausted mocks', () => {
      const mock = mockFn()

      expectEarl(() => earl(mock).not.toBeExhausted()).toThrow(expectEarl.error('Mock exhausted!'))
    })

    it('works with exhausted mocks', () => {
      const mock = mockFn<[number], number>()
      mock.expectedCall([1]).returns(1)

      expectEarl(() => earl(mock).not.toBeExhausted()).not.toThrow()
    })
  })
})
