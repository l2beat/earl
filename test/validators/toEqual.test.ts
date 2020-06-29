import { expect } from 'chai'
import sinon from 'sinon'

import { expect as earl } from '../../src'
import { Expectation } from '../../src/Expectation'
import { AnythingMatcher } from '../../src/matchers/Anything'
import { smartEq } from '../../src/validators/toEqual'

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

describe('smartEq', () => {
  it('compares primitive values', () => {
    expect(smartEq(1, 1)).to.be.true
    expect(smartEq('abc', 'abc')).to.be.true
    expect(smartEq(true, true)).to.be.true

    expect(smartEq(1, 2)).to.be.false
    expect(smartEq('abc', ' def')).to.be.false
    expect(smartEq(true, false)).to.be.false
    expect(smartEq(undefined, null)).to.be.false
  })

  it('compares objects', () => {
    expect(smartEq({}, {})).to.be.true
    expect(smartEq({ abc: true }, { abc: true })).to.be.true
    expect(smartEq({ a: { b: 1 } }, { a: { b: 1 } })).to.be.true

    expect(smartEq({}, { abc: true })).to.be.false
    expect(smartEq({ abc: true }, { abc: 'true' })).to.be.false
    expect(smartEq({ a: { b: 1, c: 1 } }, { a: { b: 1 } })).to.be.false
  })

  it('compares primitive values against matchers', () => {
    expect(smartEq(1, AnythingMatcher.make())).to.be.true
    expect(smartEq('abc', AnythingMatcher.make())).to.be.true
  })

  it('compares object values against matchers', () => {
    expect(smartEq({}, { abc: AnythingMatcher.make() })).to.be.false
    expect(smartEq({ complex: { abc: 'ced' } }, { complex: AnythingMatcher.make() })).to.be.true
    expect(smartEq({ complex: undefined }, { complex: AnythingMatcher.make() })).to.be.true
    expect(smartEq({}, { complex: AnythingMatcher.make() })).to.be.false
  })

  it('compares undefined', () => {
    expect(smartEq(undefined, {})).to.be.false
    expect(smartEq(undefined, null)).to.be.false
    expect(smartEq(undefined, 0)).to.be.false
    expect(smartEq(undefined, '')).to.be.false
    expect(smartEq(undefined, undefined)).to.be.true
  })

  it('compares null', () => {
    expect(smartEq(null, {})).to.be.false
    expect(smartEq(null, undefined)).to.be.false
    expect(smartEq(null, 0)).to.be.false
    expect(smartEq(null, '')).to.be.false
    expect(smartEq(null, null)).to.be.true
  })

  it('compares arrays', () => {
    expect(smartEq([], {})).to.be.false
    expect(smartEq([1, 2, 3], [1, 2])).to.be.false
    expect(smartEq([1, 2, 3], [1, 2, 3])).to.be.true
  })
})
