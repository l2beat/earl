import { expect } from 'chai'

import { expect as earl } from '../../../src'
import { mockFn } from '../../../src/mocks'

const sum = (a: number, b: number) => a + b

describe('toHaveBeenCalledExactlyWith', () => {
  describe('not negated', () => {
    it('works when was called with a given args', () => {
      const mock = mockFn(sum)

      mock(1, 2)

      expect(() => earl(mock).toHaveBeenCalledExactlyWith([[1, 2]])).not.to.throw()
    })

    it('works when was not called at all', () => {
      const mock = mockFn(sum)

      expect(() => earl(mock).toHaveBeenCalledExactlyWith([])).not.to.throw()
    })

    it('works with matchers', () => {
      const mock = mockFn(sum)

      mock(1, 2)

      expect(() => earl(mock).toHaveBeenCalledExactlyWith([[1, 2, earl.a(Number)]])).not.to.throw()
    })

    it('throws on partial matches', () => {
      const mock = mockFn(sum)

      mock(1, 2)

      expect(() => earl(mock).toHaveBeenCalledExactlyWith([[1, 2]])).to.throw(
        'Mock was not called exactly with [[1, 2]] but was expected to',
      )
    })
  })

  describe('negated', () => {
    it('throws when was called with a given args', () => {
      const mock = mockFn(sum)

      mock(1, 2)

      expect(() => earl(mock).not.toHaveBeenCalledExactlyWith([[1, 2, 3]])).to.throw(
        "Mock was called exactly with [[1, 2, 3]] but wasn't expected to",
      )
    })

    it("works when wasn't called with expected args", () => {
      const mock = mockFn(sum)

      mock(1, 2)

      expect(() => earl(mock).not.toHaveBeenCalledExactlyWith([[1, 2]])).not.to.throw()
    })

    it('works with empty mocks', () => {
      const mock = mockFn(sum)

      expect(() => earl(mock).not.toHaveBeenCalledExactlyWith([])).to.throw(
        "Mock was called exactly with [] but wasn't expected to",
      )
    })
  })
})
