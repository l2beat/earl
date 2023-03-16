import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeEmpty } from './toBeEmpty'

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
      }).to.throw('"hello" isn\'t empty')
    })

    it('fails for non-empty arrays', () => {
      expect(() => {
        earl([1, 2, 3]).toBeEmpty()
      }).to.throw("[1, 2, 3] isn't empty")
    })

    it('fails for non-empty sets', () => {
      expect(() => {
        earl(new Set([1, 2, 3])).toBeEmpty()
      }).to.throw("Set { 1, 2, 3 } isn't empty")
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
      }).to.throw('Map { "a" => 1, "b" => 2, "c" => 3 } isn\'t empty')
    })
  })

  describe('with .not', () => {
    it('fails for empty strings', () => {
      expect(() => {
        earl('').not.toBeEmpty()
      }).to.throw('"" is empty')
    })

    it('fails for empty arrays', () => {
      expect(() => {
        earl([]).not.toBeEmpty()
      }).to.throw('[] is empty')
    })

    it('fails for empty sets', () => {
      expect(() => {
        earl(new Set()).not.toBeEmpty()
      }).to.throw('Set {} is empty')
    })

    it('fails for empty maps', () => {
      expect(() => {
        earl(new Map()).not.toBeEmpty()
      }).to.throw('Map {} is empty')
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
