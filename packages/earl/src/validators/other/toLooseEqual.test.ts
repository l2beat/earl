import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toLooseEqual } from './toLooseEqual.js'

describe(toLooseEqual.name, () => {
  describe('without .not', () => {
    it('passes for matching complex object', () => {
      class B {
        constructor(readonly prop2: string) {}
      }

      const actual = {
        trimmed: true,
        timestamp: '12345',
        name: 'Alice Duck',
        age: 15,
        nested: {
          b: new B('abc'),
          deep: {
            nested: true,
          },
        },
      }

      expect(() => {
        earl(actual).toLooseEqual({
          trimmed: true,
          timestamp: earl.anything(),
          name: earl.includes('Duck'),
          age: earl.a(Number),
          nested: {
            b: earl.a(B),
            deep: earl.a(Object),
          },
        })
      }).not.to.throw()
    })

    it('fails on unequal primitives', () => {
      expect(() => {
        earl({ x: 42 }).toLooseEqual({ x: 420 })
      }).to.throw(
        'The value { x: 42 } is not loosely equal to { x: 420 }, but it was expected to be loosely equal.',
      )
    })

    it('fails on unequal objects', () => {
      expect(() => {
        earl({ a: undefined, b: true })
          // biome-ignore lint/suspicious/noExplicitAny: any is required here
          .toLooseEqual({ b: false } as any)
      }).to.throw(
        'The value { a: undefined, b: true } is not loosely equal to { b: false }, but it was expected to be loosely equal.',
      )
    })

    it('passes on prototype mismatch', () => {
      class Test {
        constructor(public readonly property: boolean) {}
      }

      expect(() => {
        earl(new Test(true)).toLooseEqual({ property: true })
      }).not.to.throw()
    })
  })

  describe('with .not', () => {
    it('passes when values are not loosely equal', () => {
      expect(() => {
        earl({ x: 5 }).not.toLooseEqual({ x: 7 })
      }).not.to.throw()
    })

    it('fails when values are equal', () => {
      expect(() => {
        earl({ x: 5 }).not.toLooseEqual({ x: 5 })
      }).to.throw(
        'The value { x: 5 } is loosely equal to { x: 5 }, but it was expected not to be loosely equal.',
      )
    })
  })
})
