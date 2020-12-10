import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toStrictEqual', () => {
  describe('not negated', () => {
    it('works with complex object', () => {
      const actual = {
        trimmed: true,
        timestamp: '12345',
      }

      earl(actual).toStrictEqual(actual)
    })

    it('throws on mismatch', () => {
      expect(() => earl({ test: true }).toStrictEqual({ test: true })).to.throw(
        '{"test": true} is not {"test": true}. Did you mean to use `toEqual` instead?',
      )
      expect(() => earl({ test: true }).toStrictEqual({ test: false })).to.throw(
        '{"test": true} is not {"test": false}',
      )
    })

    it('works with symbols', () => {
      const s = Symbol('abc')
      const s2 = Symbol('abc')
      earl(s).toStrictEqual(s)
      earl(s).not.toStrictEqual(s2 as any)
    })

    it('works with primitives', () => {
      earl(1).toStrictEqual(1)
      earl('a').not.toStrictEqual('ab')
      earl(NaN).toStrictEqual(NaN)
      earl(+0).not.toStrictEqual(-0)
    })
  })

  describe('negated', () => {
    it('works', () => {
      const actual = { test: true }
      earl(actual).not.toStrictEqual({ test: true })
    })

    it('throws', () => {
      const actual = { test: true }
      expect(() => earl(actual).not.toStrictEqual(actual)).to.throw('{"test": true} is {"test": true}')
    })
  })

  describe('types', () => {
    it('errors with incompatible objects', () => {
      //@ts-expect-error
      expect(() => earl({ n: 1 }).toStrictEqual({ x: 1 })).to.throw()
    })
  })
})
