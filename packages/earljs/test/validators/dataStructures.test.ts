import { expect } from 'chai'

import { expect as earl } from '../../src'

describe.only('dataStructures', () => {
  describe('toBeAContainerWith', () => {
    describe('normal', () => {
      it('works', () => {
        earl(new Set([1, 2, 3])).toBeAContainerWith(2, 1)
      })

      it('throws', () => {
        expect(() => earl(new Set([1, 2, 3])).toBeAContainerWith(4, 5)).to.throw(
          'Set {1, 2, 3} does not contain [4, 5]',
        )
      })
    })

    describe('negated', () => {
      it('works', () => {
        earl(new Set([1, 2, 3])).not.toBeAContainerWith(4)
      })

      it('throws', () => {
        expect(() => earl(new Set([1, 2, 3])).not.toBeAContainerWith(3)).to.throw('Set {1, 2, 3} contains [3]')
      })
    })
  })
})
