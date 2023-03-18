import { expect } from 'chai'

import { expect as earl } from '../index'
import { captureMochaOutput, stripIndent } from '../test/errors'
import { toEqual } from './toEqual'

describe(toEqual.name, () => {
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
        earl(actual).toEqual({
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
        earl(42).toEqual(420)
      }).to.throw("42 isn't equal to 420")
    })

    it('fails on unequal objects', () => {
      expect(() => {
        earl({
          a: undefined,
          b: true,
        }).toEqual({ b: false } as any)
      }).to.throw("{ a: undefined, b: true } isn't equal to { b: false }")
    })

    it('fails on prototype mismatch with a reasonable error message', () => {
      class Test {
        constructor(public readonly property: boolean) {}
      }

      expect(() => {
        earl(new Test(true)).toEqual({ property: true })
      }).to.throw("Test { property: true } isn't equal to { property: true }")
    })
  })

  describe('with .not', () => {
    it('passes when values are not equal', () => {
      expect(() => {
        earl(5).not.toEqual(7)
      }).not.to.throw()
    })

    it('fails when values are equal', () => {
      expect(() => {
        earl(5).not.toEqual(5)
      }).to.throw('5 is equal to 5')
    })
  })

  describe('is type safe', () => {
    it('works for a matching type', () => {
      earl(5).not.toEqual(10)
    })

    it('errors for a mismatched type', () => {
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(10)
    })

    it('works for union types', () => {
      interface A {
        type: 'A'
        a: number
      }

      interface B {
        type: 'B'
        b: string
      }

      type Union = A | B

      earl<Union>({ type: 'A', a: 5 }).not.toEqual({ type: 'B', b: 'bar' })
    })

    it('works for recursive types', () => {
      type LinkedList<T> = [T] | [T, LinkedList<T>]
      const x: LinkedList<number> = [1, [2]]
      earl(x).not.toEqual([2, [3, [4]]])
    })
  })

  describe('output', () => {
    it('simple case', () => {
      const diff = captureMochaOutput(() => {
        earl({ x: 1, y: 2 }).toEqual({ x: 3, y: 2 })
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: { x: 1, y: 2 } isn't equal to { x: 3, y: 2 }

         {
        -  x: 1
        +  x: 3
           y: 2
         }
      `)
    })

    it('long strings', () => {
      const diff = captureMochaOutput(() => {
        earl(
          'i wanna be the very best like no one ever was to catch them is my real test to train them is my cause',
        ).toEqual(
          'i wanna be the very best XXXX no one ever was to catch XXXX is my real XXXX to train them is my cause',
        )
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: "i wanna..." isn't equal to "i wanna..."

        -"i wanna be the very best like no one ever was to catch them is my real test to train them is my cause"
        +"i wanna be the very best XXXX no one ever was to catch XXXX is my real XXXX to train them is my cause"
      `)
    })
  })
})
