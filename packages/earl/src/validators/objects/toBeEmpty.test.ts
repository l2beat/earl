import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toBeEmpty } from './toBeEmpty.js'

describe(toBeEmpty.name, () => {
  describe('without .not', () => {
    it('passes for empty strings', () => {
      expect(() => {
        earl('').toBeEmpty()
      }).not.to.throw()
    })

    it('passes for empty arrays', () => {
      expect(() => {
        earl([]).toBeEmpty()
      }).not.to.throw()
    })

    it('passes for empty sets', () => {
      expect(() => {
        earl(new Set()).toBeEmpty()
      }).not.to.throw()
    })

    it('passes for empty maps', () => {
      expect(() => {
        earl(new Map()).toBeEmpty()
      }).not.to.throw()
    })

    it('fails for non-empty strings', () => {
      expect(() => {
        earl('hello').toBeEmpty()
      }).to.throw(
        'The value "hello" is not empty, but it was expected to be empty.',
      )
    })

    it('fails for non-empty arrays', () => {
      expect(() => {
        earl([1, 2, 3]).toBeEmpty()
      }).to.throw(
        'The value [1, 2, 3] is not empty, but it was expected to be empty.',
      )
    })

    it('fails for non-empty sets', () => {
      expect(() => {
        earl(new Set([1, 2, 3])).toBeEmpty()
      }).to.throw(
        'The value Set { 1, 2, 3 } is not empty, but it was expected to be empty.',
      )
    })

    it('fails for non-empty maps', () => {
      expect(() => {
        earl(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
        ).toBeEmpty()
      }).to.throw(
        'The value Map { "a" => 1, "b" => 2, "c" => 3 } is not empty, but it was expected to be empty.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for empty strings', () => {
      expect(() => {
        earl('').not.toBeEmpty()
      }).to.throw('The value "" is empty, but it was expected not to be empty.')
    })

    it('fails for empty arrays', () => {
      expect(() => {
        earl([]).not.toBeEmpty()
      }).to.throw('The value [] is empty, but it was expected not to be empty.')
    })

    it('fails for empty sets', () => {
      expect(() => {
        earl(new Set()).not.toBeEmpty()
      }).to.throw(
        'The value Set {} is empty, but it was expected not to be empty.',
      )
    })

    it('fails for empty maps', () => {
      expect(() => {
        earl(new Map()).not.toBeEmpty()
      }).to.throw(
        'The value Map {} is empty, but it was expected not to be empty.',
      )
    })

    it('passes for non-empty strings', () => {
      expect(() => {
        earl('hello').not.toBeEmpty()
      }).not.to.throw()
    })

    it('passes for non-empty arrays', () => {
      expect(() => {
        earl([1, 2, 3]).not.toBeEmpty()
      }).not.to.throw()
    })

    it('passes for non-empty sets', () => {
      expect(() => {
        earl(new Set([1, 2, 3])).not.toBeEmpty()
      }).not.to.throw()
    })

    it('passes for non-empty maps', () => {
      expect(() => {
        earl(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
        ).not.toBeEmpty()
      }).not.to.throw()
    })
  })
})
