import { expect } from 'chai'

import { expect as earl } from '../../index'
import { captureMochaOutput, stripIndent } from '../../test/errors'
import { toEqualUnsorted } from './toEqualUnsorted'

describe(toEqualUnsorted.name, () => {
  describe('without .not', () => {
    it('passes for empty arrays', () => {
      expect(() => {
        earl([]).toEqualUnsorted([])
      }).not.to.throw()
    })

    it('passes for unordered arrays', () => {
      expect(() => {
        earl([1, 2, 3]).toEqualUnsorted([2, 1, 3])
      }).not.to.throw()
    })

    it('fails for arrays with different elements', () => {
      expect(() => {
        earl([1, 2, 3]).toEqualUnsorted([2, 1, 4])
      }).to.throw(
        'The value [1, 2, 3] is not unsorted equal to [2, 1, 4], but it was expected to be unsorted equal.',
      )
    })

    it('fails for arrays with different length', () => {
      expect(() => {
        earl([1, 2, 3]).toEqualUnsorted([2, 1, 3, 4])
      }).to.throw(
        'The value [1, 2, 3] has a different length than [2, 1, 3, 4], but is was expected to have the same length.',
      )
    })

    it('passes for a lucky matcher set', () => {
      expect(() => {
        earl([1, 2, 3]).toEqualUnsorted([2, 3, earl.a(Number)])
      }).not.to.throw()
    })

    it('fails for an unlucky matcher set', () => {
      expect(() => {
        earl([1, 2, 3]).toEqualUnsorted([earl.a(Number), 1, 2])
      }).to.throw(
        'The value [1, 2, 3] is not unsorted equal to [expect.a(Number), 1, 2], but it was expected to be unsorted equal.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for empty arrays', () => {
      expect(() => {
        earl([]).not.toEqualUnsorted([])
      }).to.throw(
        'The value [] is unsorted equal to [], but it was expected not to be unsorted equal.',
      )
    })

    it('fails for unordered arrays', () => {
      expect(() => {
        earl([1, 2, 3]).not.toEqualUnsorted([2, 1, 3])
      }).to.throw(
        'The value [1, 2, 3] is unsorted equal to [2, 1, 3], but it was expected not to be unsorted equal.',
      )
    })

    it('passes for arrays with different elements', () => {
      expect(() => {
        earl([1, 2, 3]).not.toEqualUnsorted([2, 1, 4])
      }).not.to.throw()
    })

    it('passes for arrays with different length', () => {
      expect(() => {
        earl([1, 2, 3]).not.toEqualUnsorted([2, 1, 3, 4])
      }).not.to.throw()
    })

    it('fails for a lucky matcher set', () => {
      expect(() => {
        earl([1, 2, 3]).not.toEqualUnsorted([2, 3, earl.a(Number)])
      }).to.throw(
        'The value [1, 2, 3] is unsorted equal to [2, 3, expect.a(Number)], but it was expected not to be unsorted equal.',
      )
    })

    it('fails for an unlucky matcher set', () => {
      expect(() => {
        earl([1, 2, 3]).not.toEqualUnsorted([earl.a(Number), 1, 2])
      }).not.to.throw()
    })
  })

  describe('output', () => {
    it('reorders the expected array', () => {
      const diff = captureMochaOutput(() => {
        earl([1, 2, 3, 4]).toEqualUnsorted([5, 3, 1, 2])
      })

      expect(diff).to.equal(stripIndent`
        The value [1, 2, 3, 4] is not unsorted equal to [5, 3, 1, 2], but it was expected to be unsorted equal.

         [
           1
           2
           3
        -  4
        +  5
         ]
      `)
    })
  })
})
