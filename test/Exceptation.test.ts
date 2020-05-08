import { expect } from 'chai'

import { smartEq } from '../src/Expectation'
import { AnythingMatcher } from '../src/matchers'

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
