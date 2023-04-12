import { expect } from 'chai'

import { expect as earl, mockFn } from '../../index.js'
import { toHaveBeenOnlyCalledWith } from './toHaveBeenOnlyCalledWith.js'

describe(toHaveBeenOnlyCalledWith.name, () => {
  describe('without .not', () => {
    it('passes when arguments match', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(3, 4)
        earl(mock).toHaveBeenOnlyCalledWith(3, earl.greaterThan(3))
      }).not.to.throw()
    })

    it('fails when the mock function was not called', () => {
      expect(() => {
        const mock = mockFn()
        earl(mock).toHaveBeenOnlyCalledWith(1)
      }).to.throw(
        'The mock function was never called, but it was expected to have been called exactly once.',
      )
    })

    it('fails when the mock function was called too much', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).toHaveBeenOnlyCalledWith(3, 4)
      }).to.throw(
        'The mock function was called twice, but it was expected to have been called exactly once.',
      )
    })

    it('fails when the arguments do not match', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(3, 4)
        earl(mock).toHaveBeenOnlyCalledWith(5, earl.greaterThan(7))
      }).to.throw(
        'The passed arguments [3, 4] are not equal to [5, expect.?], but were expected to be equal.',
      )
    })
  })

  describe('with .not', () => {
    it('passes when arguments do not match', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).not.toHaveBeenOnlyCalledWith(5, earl.greaterThan(7))
      }).not.to.throw()
    })

    it('passes when the mock function was not called', () => {
      expect(() => {
        const mock = mockFn()
        earl(mock).not.toHaveBeenOnlyCalledWith(1, 1)
      }).not.to.throw()
    })

    it('passes when the mock function was called too much', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).not.toHaveBeenOnlyCalledWith(3, 4)
      }).not.to.throw()
    })

    it('fails when the arguments match', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(3, 4)
        earl(mock).not.toHaveBeenOnlyCalledWith(3, earl.greaterThan(3))
      }).to.throw(
        'The passed arguments [3, 4] are equal to [3, expect.?], but were expected not to be equal.',
      )
    })
  })
})
