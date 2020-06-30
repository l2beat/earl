import { expect } from 'chai'
import sinon from 'sinon'

import { expect as earl } from '../../src'
import { Expectation } from '../../src/Expectation'

describe('toEqual', () => {
  describe('autofix', () => {
    it('does not call autofix when not needed', () => {
      const dummyAutofix = sinon.spy()
      const e = new Expectation(dummyAutofix, 'abc')

      expect(() => e.toEqual(undefined as any)).to.throw()
      expect(dummyAutofix).not.to.be.called
    })

    it('calls autofix on missing values', () => {
      const dummyAutofix = sinon.spy()
      const e = new Expectation(dummyAutofix, 'abc')

      e.toEqual()

      expect(dummyAutofix).to.be.calledOnceWithExactly('toEqual', 'abc')
    })
  })

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
