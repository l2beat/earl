import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toReferentiallyEqual', () => {
  describe('not negated', () => {
    it('works with complex object', () => {
      const actual = {
        trimmed: true,
        timestamp: '12345',
      }

      earl(actual).toReferentiallyEqual(actual)
    })

    it('throws on mismatch', () => {
      expect(() => earl({ test: true }).toReferentiallyEqual({ test: true })).to.throw(
        '{"test": true} is not {"test": true}. Did you mean to use `toEqual` instead?',
      )
      expect(() => earl({ test: true }).toReferentiallyEqual({ test: false })).to.throw(
        '{"test": true} is not {"test": false}',
      )
    })

    it('works with symbols', () => {
      const s = Symbol('abc')
      const s2 = Symbol('abc')
      earl(s).toReferentiallyEqual(s)
      earl(s).not.toReferentiallyEqual(s2 as any)
    })

    it('works with primitives', () => {
      earl(1).toReferentiallyEqual(1)
      earl('a').not.toReferentiallyEqual('ab')
      earl(NaN).toReferentiallyEqual(NaN)
      earl(+0).not.toReferentiallyEqual(-0)
    })
  })

  describe('negated', () => {
    it('works', () => {
      const actual = { test: true }
      earl(actual).not.toReferentiallyEqual({ test: true })
    })

    it('throws', () => {
      const actual = { test: true }
      expect(() => earl(actual).not.toReferentiallyEqual(actual)).to.throw('{"test": true} is {"test": true}')
    })
  })

  describe('types', () => {
    it('errors with incompatible objects', () => {
      //@ts-expect-error
      expect(() => earl({ n: 1 }).toReferentiallyEqual({ x: 1 })).to.throw()
    })
  })
})
