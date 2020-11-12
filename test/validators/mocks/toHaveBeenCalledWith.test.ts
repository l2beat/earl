import { expect } from 'chai'

import { expect as earl } from '../../../src'
import { mockFn } from '../../../src/mocks'

const noop = (..._args: any[]) => {}

describe('toHaveBeenCalledWith', () => {
  describe('not negated', () => {
    it('works when was called with a given args', () => {
      const mock = mockFn(noop)

      mock(1, 2, 3)

      expect(() => earl(mock).toHaveBeenCalledWith([1, 2, 3])).not.to.throw()
    })

    it('works with matchers', () => {
      const mock = mockFn(noop)

      mock(1, 2, 3)

      expect(() => earl(mock).toHaveBeenCalledWith([1, 2, earl.a(Number)])).not.to.throw()
    })

    it('throws on partial matches', () => {
      const mock = mockFn(noop)

      mock(1, 2, 3)

      expect(() => earl(mock).toHaveBeenCalledWith([1, 2])).to.throw(
        'Mock was not called with [1, 2] but was expected to',
      )
    })

    it('throws with empty mocks', () => {
      const mock = mockFn(noop)

      expect(() => earl(mock).toHaveBeenCalledWith([])).to.throw('Mock was not called with [] but was expected to')
    })
  })

  describe('negated', () => {
    it('throws when was called with a given args', () => {
      const mock = mockFn(noop)

      mock(1, 2, 3)

      expect(() => earl(mock).not.toHaveBeenCalledWith([1, 2, 3])).to.throw(
        "Mock was called with [1, 2, 3] but wasn't expected to",
      )
    })

    it('works when wasnt called with expected args', () => {
      const mock = mockFn(noop)

      mock(1, 2, 3)

      expect(() => earl(mock).not.toHaveBeenCalledWith([1, 2])).not.to.throw()
    })

    it('works with empty mocks', () => {
      const mock = mockFn(noop)

      expect(() => earl(mock).not.toHaveBeenCalledWith([])).not.to.throw()
    })
  })
})
