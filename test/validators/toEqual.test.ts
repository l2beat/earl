import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toEqual', () => {
  describe('not negated', () => {
    it('works with complex object', () => {
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

      earl(actual).toEqual({
        trimmed: true,
        timestamp: earl.anything(),
        name: earl.stringMatching('Duck'),
        age: earl.a(Number),
        nested: {
          b: earl.a(B),
          deep: earl.a(Object),
        },
      })
    })

    it('throws on mismatch', () => {
      expect(() => earl(42).toEqual(420)).to.throw('42 not equal to 420')
    })

    it('throws on prototype mismatch with a reasonable error message', () => {
      class Test {
        constructor(public readonly property: boolean) {}
      }

      expect(() => earl(new Test(true)).toEqual({ property: true })).to.throw(
        '{"property": true} not equal to {"property": true} - Prototype mismatch',
      )
    })

    describe('error messages', () => {
      it('throws on mismatch', () => {
        expect(() =>
          earl({
            a: undefined,
            b: true,
          }).toEqual({ b: false } as any),
        ).to.throw('{"a": undefined, "b": true} not equal to {"b": false}')
      })
    })
  })

  describe('negated', () => {
    it('works', () => {
      earl(5).not.toEqual(7)
    })

    it('throws', () => {
      expect(() => earl(5).not.toEqual(5)).to.throw('5 equal to 5')
    })
  })
})
