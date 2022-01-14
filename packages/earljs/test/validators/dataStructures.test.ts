import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('dataStructures', () => {
  describe('toBeAContainerWith', () => {
    describe('normal', () => {
      it('works', () => {
        earl(new Set([1, 2, 3])).toBeAContainerWith(2, 1)
      })

      it('throws', () => {
        expect(() => earl(new Set([1, 2, 3])).toBeAContainerWith(4, 5)).to.throw(
          'Set { 1, 2, 3 } does not contain [4, 5]',
        )
      })
    })

    describe('negated', () => {
      it('works', () => {
        earl(new Set([1, 2, 3])).not.toBeAContainerWith(4)
      })

      it('throws', () => {
        expect(() => earl(new Set([1, 2, 3])).not.toBeAContainerWith(3)).to.throw('Set { 1, 2, 3 } contains [3]')
      })
    })
  })

  describe('toBeAnArrayOfLength', () => {
    describe('normal', () => {
      it('works', () => {
        earl([1, 2, 3]).toBeAnArrayOfLength(3)
        earl([1, 2, 3]).toBeAnArrayOfLength(earl.numberGreaterThanOrEqualTo(3))
      })

      it('throws', () => {
        expect(() => earl([1, 2, 3]).toBeAnArrayOfLength(4)).to.throw('[1, 2, 3] does not have length 4')
      })
    })

    describe('negated', () => {
      it('works', () => {
        earl([1, 2, 3]).not.toBeAnArrayOfLength(2)
      })

      it('throws', () => {
        expect(() => earl([1, 2, 3]).not.toBeAnArrayOfLength(3)).to.throw('[1, 2, 3] does have length 3')
      })
    })
  })

  describe('toBeAnArrayWith', () => {
    describe('normal', () => {
      it('works', () => {
        earl([1, 2, 3]).toBeAnArrayWith(2, 1)
      })

      it('throws', () => {
        expect(() => earl([1, 2, 3]).toBeAnArrayWith(4, 5)).to.throw('[1, 2, 3] does not contain array [4, 5]')
      })
    })

    describe('negated', () => {
      it('works', () => {
        earl([1, 2, 3]).not.toBeAnArrayWith(4)
      })

      it('throws', () => {
        expect(() => earl([1, 2, 3]).not.toBeAnArrayWith(3)).to.throw('[1, 2, 3] contains array [3]')
      })
    })

    describe('types', () => {
      it('is typesafe', () => {
        // @ts-expect-error
        expect(() => earl(new Set([1, 2, 3])).toBeAnArrayWith(1)).to.throw('Set { 1, 2, 3 } does not contain array [1]')
      })
    })
  })

  describe('toBeAnObjectWith', () => {
    describe('normal', () => {
      it('works', () => {
        earl({ a: 1, b: 2 }).toBeAnObjectWith({ a: 1 })
      })

      it('throws', () => {
        expect(() => earl({ a: 1, b: 2 }).toBeAnObjectWith({ c: 1 })).to.throw(
          '{ a: 1, b: 2 } is not a subset of object { c: 1 }',
        )
      })
    })

    describe('negated', () => {
      it('works', () => {
        earl({ a: 1, b: 2 }).not.toBeAnObjectWith({ c: 1 })
      })

      it('throws', () => {
        expect(() => earl({ a: 1, b: 2 }).not.toBeAnObjectWith({ a: 1 })).to.throw(
          '{ a: 1, b: 2 } is a subset of object { a: 1 }',
        )
      })
    })
  })
})
