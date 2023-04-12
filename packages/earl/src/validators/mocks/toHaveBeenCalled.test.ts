import { expect } from 'chai'

import { expect as earl, mockFn } from '../../index.js'
import { toHaveBeenCalled } from './toHaveBeenCalled.js'

describe(toHaveBeenCalled.name, () => {
  describe('without .not', () => {
    it('passes when the mock function has been called', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).toHaveBeenCalled()
      }).not.to.throw()
    })

    it('fails when the mock function has not been called', () => {
      expect(() => {
        earl(mockFn()).toHaveBeenCalled()
      }).to.throw(
        'The mock function was never called, but it was expected to have been called at least once.',
      )
    })
  })

  describe('with .not', () => {
    it('passes when the mock function has not been called', () => {
      expect(() => {
        earl(mockFn()).not.toHaveBeenCalled()
      }).not.to.throw()
    })

    it('fails when the mock function has been called', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).not.toHaveBeenCalled()
      }).to.throw(
        'The mock function was called twice, but it was expected to never have been called.',
      )
    })
  })
})
