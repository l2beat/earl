import { expect } from 'chai'

import { expect as earl } from '../index'
import { toHaveLength } from './toHaveLength'

describe(toHaveLength.name, () => {
  describe('without .not', () => {
    it('passes for a string of a given length', () => {
      expect(() => {
        earl('hello').toHaveLength(5)
      }).not.to.throw()
    })

    it('passes for an array of a given length', () => {
      expect(() => {
        earl([1, 2, 3]).toHaveLength(3)
      }).not.to.throw()
    })

    it('passes for an object with a given length property', () => {
      expect(() => {
        earl({ length: 5 }).toHaveLength(5)
      }).not.to.throw()
    })

    it('fails for a string of a different length', () => {
      expect(() => {
        earl('hello').toHaveLength(10)
      }).to.throw(
        'The value "hello" does not have length 10, but it was expected to.',
      )
    })

    it('fails for an array of a different length', () => {
      expect(() => {
        earl([1, 2, 3]).toHaveLength(10)
      }).to.throw(
        'The value [1, 2, 3] does not have length 10, but it was expected to.',
      )
    })

    it('fails for an object with a different length property', () => {
      expect(() => {
        earl({ length: 5 }).toHaveLength(10)
      }).to.throw(
        'The value { length: 5 } does not have length 10, but it was expected to.',
      )
    })
  })

  describe('with .not', () => {
    it('passes for a string of a different length', () => {
      expect(() => {
        earl('hello').not.toHaveLength(10)
      }).not.to.throw()
    })

    it('passes for an array of a different length', () => {
      expect(() => {
        earl([1, 2, 3]).not.toHaveLength(10)
      }).not.to.throw()
    })

    it('passes for an object with a different length property', () => {
      expect(() => {
        earl({ length: 5 }).not.toHaveLength(10)
      }).not.to.throw()
    })

    it('fails for a string of a given length', () => {
      expect(() => {
        earl('hello').not.toHaveLength(5)
      }).to.throw('The value "hello" has length 5, but it was expected not to.')
    })

    it('fails for an array of a given length', () => {
      expect(() => {
        earl([1, 2, 3]).not.toHaveLength(3)
      }).to.throw(
        'The value [1, 2, 3] has length 3, but it was expected not to.',
      )
    })

    it('fails for an object with a given length property', () => {
      expect(() => {
        earl({ length: 5 }).not.toHaveLength(5)
      }).to.throw(
        'The value { length: 5 } has length 5, but it was expected not to.',
      )
    })
  })

  it('supports matchers', () => {
    expect(() => {
      earl('hello').toHaveLength(earl.greaterThan(3))
    }).not.to.throw()

    expect(() => {
      earl('hello').toHaveLength(earl.greaterThan(10))
    }).to.throw(
      'The value "hello" does not have length expect.greaterThan(10), but it was expected to.',
    )
  })
})
