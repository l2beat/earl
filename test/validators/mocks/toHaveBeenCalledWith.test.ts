import { expect } from 'chai'

import { expect as earl, expect as expectEarl } from '../../../src'
import { looseMockFn } from '../../../src/mocks/looseMock'

describe('toHaveBeenCalledWith', () => {
  describe('not negated', () => {
    it('works when was called with a given args', () => {
      const mock = looseMockFn(() => {})

      mock(1, 2, 3)

      expectEarl(() => earl(mock).toHaveBeenCalledWith([1, 2, 3])).not.toThrow()
    })

    it('works with matchers', () => {
      const mock = looseMockFn(() => {})

      mock(1, 2, 3)

      expectEarl(() => earl(mock).toHaveBeenCalledWith([1, 2, earl.a(Number)])).not.toThrow()
    })

    it('throws on partial matches', () => {
      const mock = looseMockFn(() => {})

      mock(1, 2, 3)

      expect(() => earl(mock).toHaveBeenCalledWith([1, 2])).to.throw(
        'Mock was not called with [1, 2] but was expected to',
      )
    })

    it('throws with empty mocks', () => {
      const mock = looseMockFn(() => {})

      expectEarl(() => earl(mock).toHaveBeenCalledWith([])).toThrow(
        expectEarl.error('Mock was not called with [] but was expected to'),
      )
    })
  })

  describe('negated', () => {
    it('throws when was called with a given args', () => {
      const mock = looseMockFn(() => {})

      mock(1, 2, 3)

      expect(() => earl(mock).not.toHaveBeenCalledWith([1, 2, 3])).to.throw(
        "Mock was called with [1, 2, 3] but wasn't expected to",
      )
    })

    it('works when wasnt called with expected args', () => {
      const mock = looseMockFn(() => {})

      mock(1, 2, 3)

      expectEarl(() => earl(mock).not.toHaveBeenCalledWith([1, 2])).not.toThrow()
    })

    it('works with empty mocks', () => {
      const mock = looseMockFn(() => {})

      expectEarl(() => earl(mock).not.toHaveBeenCalledWith([])).not.toThrow()
    })
  })
})
