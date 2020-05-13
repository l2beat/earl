import { expect } from 'chai'

import { AMatcher } from '../../../src/matchers/asymmetric/A'

describe('A asymmetric matcher', () => {
  it('should match string', () => {
    const a = new AMatcher(String)

    expect(a.check('a')).to.be.true
    // eslint-disable-next-line
    expect(a.check(new String('green'))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check(1)).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match numbers', () => {
    const a = new AMatcher(Number)

    expect(a.check(5)).to.be.true
    // eslint-disable-next-line
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match boolean', () => {
    const a = new AMatcher(Boolean)

    expect(a.check(true)).to.be.true
    // eslint-disable-next-line
    expect(a.check(new Boolean(false))).to.be.true

    expect(a.check(5)).to.be.false
    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match bigint', () => {
    const a = new AMatcher(BigInt)

    expect(a.check(5n)).to.be.true
    expect(a.check(BigInt(5))).to.be.true

    expect(a.check(5)).to.be.false
    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match function', () => {
    const a = new AMatcher(Function)

    expect(a.check(() => {})).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match object', () => {
    const a = new AMatcher(Object)

    expect(a.check({})).to.be.true
    // eslint-disable-next-line
    expect(a.check(new Object({ a: 5 }))).to.be.true
    expect(a.check([])).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
  })

  it('should match symbol', () => {
    // eslint-disable-next-line
    const a = new AMatcher(Symbol)

    // eslint-disable-next-line
    expect(a.check(Symbol())).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match an array', () => {
    const a = new AMatcher(Array)

    expect(a.check([])).to.be.true

    expect(a.check(5)).to.be.false
    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check({})).to.be.false
  })
})
