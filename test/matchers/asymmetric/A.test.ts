import { expect } from 'chai'

import { AMatcher } from '../../../src/matchers/asymmetric/A'

describe.only('A asymmetric matcher', () => {
  it('should match string', () => {
    const a = AMatcher.make(String)

    expect(a.check('a')).to.be.true
    expect(a.check(new String('green'))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check(1)).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match numbers', () => {
    const a = AMatcher.make(Number)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match boolean', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match bigint', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match function', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match object', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match symbol', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })
  it('should match undefined', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })
  it('should match an array', () => {
    const a = AMatcher.make(Boolean)

    expect(a.check(5)).to.be.true
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })
})
