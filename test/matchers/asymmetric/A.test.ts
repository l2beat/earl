import { expect } from 'chai'

import { AMatcher } from '../../../src/matchers/asymmetric/A'

describe('A asymmetric matcher', () => {
  it('should match string', () => {
    const m = new AMatcher(String)

    expect(m.check('m')).to.be.true
    // eslint-disable-next-line
    expect(m.check(new String('green'))).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(1)).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match numbers', () => {
    const m = new AMatcher(Number)

    expect(m.check(5)).to.be.true
    // eslint-disable-next-line
    expect(m.check(new Number(5))).to.be.true

    expect(m.check(NaN)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match boolean', () => {
    const m = new AMatcher(Boolean)

    expect(m.check(true)).to.be.true
    // eslint-disable-next-line
    expect(m.check(new Boolean(false))).to.be.true

    expect(m.check(5)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match bigint', () => {
    const m = new AMatcher(BigInt)

    expect(m.check(5n)).to.be.true
    expect(m.check(BigInt(5))).to.be.true

    expect(m.check(5)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match function', () => {
    const m = new AMatcher(Function)

    expect(m.check(() => {})).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match object', () => {
    const m = new AMatcher(Object)

    expect(m.check({})).to.be.true
    // eslint-disable-next-line
    expect(m.check(new Object({ m: 5 }))).to.be.true
    expect(m.check([])).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
  })

  it('should match symbol', () => {
    // eslint-disable-next-line
    const m = new AMatcher(Symbol)

    // eslint-disable-next-line
    expect(m.check(Symbol())).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match an array', () => {
    const m = new AMatcher(Array)

    expect(m.check([])).to.be.true

    expect(m.check(5)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check({})).to.be.false
  })
})
