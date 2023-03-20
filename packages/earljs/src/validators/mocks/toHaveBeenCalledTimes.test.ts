import { expect } from 'chai'

import { expect as earl, mockFn } from '../../index'
import { toHaveBeenCalledTimes } from './toHaveBeenCalledTimes'

describe(toHaveBeenCalledTimes.name, () => {
  describe('without .not', () => {
    it('passes when the mock function has been called the specified number of times', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).toHaveBeenCalledTimes(2)
      }).not.to.throw()
    })

    it('fails when the mock function has not been called the specified number of times', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        earl(mock).toHaveBeenCalledTimes(2)
      }).to.throw(
        'The mock function was called once, but it was expected to have been called twice.',
      )
    })
  })

  describe('with .not', () => {
    it('passes when the mock function has not been called the specified number of times', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        earl(mock).not.toHaveBeenCalledTimes(2)
      }).not.to.throw()
    })

    it('fails when the mock function has been called the specified number of times', () => {
      expect(() => {
        const mock = mockFn((a: number, b: number) => a + b)
        mock(1, 2)
        mock(3, 4)
        earl(mock).not.toHaveBeenCalledTimes(2)
      }).to.throw(
        'The mock function was called twice, but it was expected not to have been called twice.',
      )
    })
  })
})
