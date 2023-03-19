import { expect } from 'chai'

import { expect as earl, mockFn } from '../index'
import { toHaveBeenExhausted } from './toHaveBeenExhausted'

describe(toHaveBeenExhausted.name, () => {
  describe('without .not', () => {
    it('passes for non-configured', () => {
      expect(() => {
        const mock = mockFn()
        earl(mock).toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('passes for infinite mocks', () => {
      expect(() => {
        const mock = mockFn(() => 1)
        earl(mock).toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('passes for finite, configured and exhausted mocks', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(1).returnsOnce(2)
        mock()
        mock()
        earl(mock).toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('passes for infinite, configured and exhausted mocks', () => {
      expect(() => {
        const mock = mockFn(() => 1)
          .returnsOnce(2)
          .returnsOnce(3)
        mock()
        mock()
        earl(mock).toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('fails for finite, non-exhausted mocks without overrides', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(1).returnsOnce(2)
        mock()
        earl(mock).toHaveBeenExhausted()
      }).to.throw('The mock function was not exhausted, 1 calls remaining.')
    })

    it('fails for finite, non-exhausted mocks with overrides', () => {
      expect(() => {
        const mock = mockFn().given(4).returnsOnce(5)
        earl(mock).toHaveBeenExhausted()
      }).to.throw(
        'The mock function was not exhausted, 1 conditional calls remaining.',
      )
    })

    it('fails for finite, non-exhausted mocks with calls and overrides', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(3).given(4).returnsOnce(5)
        earl(mock).toHaveBeenExhausted()
      }).to.throw(
        'The mock function was not exhausted, 1 calls and 1 conditional calls remaining.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for non-configured', () => {
      expect(() => {
        const mock = mockFn()
        earl(mock).not.toHaveBeenExhausted()
      }).to.throw(
        'The mock function has been exhausted, but it was not expected to be.',
      )
    })

    it('fails for infinite mocks', () => {
      expect(() => {
        const mock = mockFn(() => 1)
        earl(mock).not.toHaveBeenExhausted()
      }).to.throw(
        'The mock function has been exhausted, but it was not expected to be.',
      )
    })

    it('fails for finite, configured and exhausted mocks', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(1).returnsOnce(2)
        mock()
        mock()
        earl(mock).not.toHaveBeenExhausted()
      }).to.throw(
        'The mock function has been exhausted, but it was not expected to be.',
      )
    })

    it('fails for infinite, configured and exhausted mocks', () => {
      expect(() => {
        const mock = mockFn(() => 1)
          .returnsOnce(2)
          .returnsOnce(3)
        mock()
        mock()
        earl(mock).not.toHaveBeenExhausted()
      }).to.throw(
        'The mock function has been exhausted, but it was not expected to be.',
      )
    })

    it('passes for finite, non-exhausted mocks without overrides', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(1).returnsOnce(2)
        mock()
        earl(mock).not.toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('passes for finite, non-exhausted mocks with overrides', () => {
      expect(() => {
        const mock = mockFn().given(4).returnsOnce(5)
        earl(mock).not.toHaveBeenExhausted()
      }).not.to.throw()
    })

    it('passes for finite, non-exhausted mocks with calls and overrides', () => {
      expect(() => {
        const mock = mockFn().returnsOnce(3).given(4).returnsOnce(5)
        earl(mock).not.toHaveBeenExhausted()
      }).not.to.throw()
    })
  })
})
