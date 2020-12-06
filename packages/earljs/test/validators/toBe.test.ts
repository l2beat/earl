import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toBe', () => {
  describe('not negated', () => {
    it('works with complex object', () => {
      const actual = {
        trimmed: true,
        timestamp: '12345',
      }

      earl(actual).toBe(actual)
    })

    it('throws on mismatch', () => {
      expect(() => earl({ test: true }).toBe({ test: true })).to.throw(
        '{"test": true} is not {"test": true}. Did you mean to use `toEqual` instead?',
      )
      expect(() => earl({ test: true }).toBe({ test: false })).to.throw('{"test": true} is not {"test": false}')
    })
  })

  describe('negated', () => {
    it('works', () => {
      const actual = { test: true }
      earl(actual).not.toBe({ test: true })
    })

    it('throws', () => {
      const actual = { test: true }
      expect(() => earl(actual).not.toBe(actual)).to.throw('{"test": true} is {"test": true}')
    })
  })

  describe('types', () => {
    it('work with objects', () => {
      const o = { n: 1 }
      earl(o).toBe(o)
    })

    it('errors with incompatible objects', () => {
      //@ts-expect-error
      expect(() => earl({ n: 1 }).toBe({ x: 1 })).to.throw()
    })

    it('errors with primitive values', () => {
      //@ts-expect-error
      earl(1).toBe(1)

      //@ts-expect-error
      expect(() => earl(true).toBe(false)).to.throw()
    })
  })
})
