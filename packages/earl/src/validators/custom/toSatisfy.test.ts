import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toSatisfy } from './toSatisfy'

describe(toSatisfy.name, () => {
  describe('without .not', () => {
    it('passes for a value that satisfies the predicate', () => {
      expect(() => {
        earl(42).toSatisfy((value) => value > 0)
      }).not.to.throw()
    })

    it('fails for a value that does not satisfy the predicate', () => {
      expect(() => {
        earl(42).toSatisfy((value) => value < 0)
      }).to.throw(
        'The value 42 does not satisfy the given predicate, but it was expected to satisfy it.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for a value that satisfies the predicate', () => {
      expect(() => {
        earl(42).not.toSatisfy((value) => value > 0)
      }).to.throw(
        'The value 42 satisfies the given predicate, but it was expected not to satisfy it.',
      )
    })

    it('passes for a value that does not satisfy the predicate', () => {
      expect(() => {
        earl(42).not.toSatisfy((value) => value < 0)
      }).not.to.throw()
    })
  })
})
