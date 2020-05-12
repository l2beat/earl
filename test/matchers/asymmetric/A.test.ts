import { expect } from 'chai'

import { AMatcher } from '../../../src/matchers/asymmetric/A'

describe('A asymmetric matcher', () => {
  it('should match string', () => {
    const a = AMatcher.make(String)

    expect(a.check('a')).to.be.true
    // eslint-disable-next-line
    expect(a.check(new String('green'))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check(1)).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match numbers', () => {
    const a = AMatcher.make(Number)

    expect(a.check(5)).to.be.true
    // eslint-disable-next-line
    expect(a.check(new Number(5))).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match boolean', () => {
    const a = AMatcher.make(Boolean)

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
    const a = AMatcher.make(BigInt)

    expect(a.check(5n)).to.be.true
    expect(a.check(BigInt(5))).to.be.true

    expect(a.check(5)).to.be.false
    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match function', () => {
    const a = AMatcher.make(Function)

    expect(a.check(() => {})).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match object', () => {
    const a = AMatcher.make(Object)

    expect(a.check({})).to.be.true
    // eslint-disable-next-line
    expect(a.check(new Object({ a: 5 }))).to.be.true
    expect(a.check([])).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
  })

  it('should match symbol', () => {
    const a = AMatcher.make(Symbol)

    // eslint-disable-next-line
    expect(a.check(Symbol())).to.be.true

    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check([])).to.be.false
    expect(a.check({})).to.be.false
  })

  it('should match an array', () => {
    const a = AMatcher.make(Array)

    expect(a.check([])).to.be.true

    expect(a.check(5)).to.be.false
    expect(a.check(undefined)).to.be.false
    expect(a.check(null)).to.be.false
    expect(a.check({})).to.be.false
  })
})
