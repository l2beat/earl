import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toBeAnInteger } from './toBeAnInteger.js'

describe(toBeAnInteger.name, () => {
  describe('without .not', () => {
    it('passes for 42', () => {
      expect(() => {
        earl(42).toBeAnInteger()
      }).not.to.throw()
    })

    it('passes for 42n', () => {
      expect(() => {
        earl(BigInt(42)).toBeAnInteger()
      }).not.to.throw()
    })

    it('fails for 12.5', () => {
      expect(() => {
        earl(12.5).toBeAnInteger()
      }).to.throw(
        'The value 12.5 is not an integer, but it was expected to be an integer.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for 42', () => {
      expect(() => {
        earl(42).not.toBeAnInteger()
      }).to.throw(
        'The value 42 is an integer, but it was expected not to be an integer.',
      )
    })

    it('fails for 42n', () => {
      expect(() => {
        earl(BigInt(42)).not.toBeAnInteger()
      }).to.throw(
        'The value 42n is an integer, but it was expected not to be an integer.',
      )
    })

    it('passes for 12.5', () => {
      expect(() => {
        earl(12.5).not.toBeAnInteger()
      }).not.to.throw()
    })
  })
})
