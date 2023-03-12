import { expect } from 'chai'

import { expect as earl } from '../expect'
import { a } from './a'

describe('A matcher', () => {
  it('should match string', () => {
    const m = a(String)

    expect(m.check('m')).to.be.true
    // eslint-disable-next-line
    expect(m.check(new String('green'))).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(1)).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match numbers', () => {
    const m = a(Number)

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
    const m = a(Boolean)

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
    const m = a(BigInt)

    // We eval here because of typescript compilation target being <ES2020
    // eslint-disable-next-line no-eval
    expect(m.check(eval('5n'))).to.be.true
    expect(m.check(BigInt(5))).to.be.true

    expect(m.check(5)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match function', () => {
    const m = a(Function)

    expect(m.check(() => {})).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match object', () => {
    const m = a(Object)

    expect(m.check({})).to.be.true
    // eslint-disable-next-line
    expect(m.check(new Object({ m: 5 }))).to.be.true
    expect(m.check([])).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
  })

  it('should match symbol', () => {
    // eslint-disable-next-line
    const m = a(Symbol)

    // eslint-disable-next-line
    expect(m.check(Symbol())).to.be.true

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check([])).to.be.false
    expect(m.check({})).to.be.false
  })

  it('should match an array', () => {
    const m = a(Array)

    expect(m.check([])).to.be.true

    expect(m.check(5)).to.be.false
    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check({})).to.be.false
  })

  describe('in expectation', () => {
    it('works with arrays', () => {
      earl([1, 2, 3]).toEqual(earl.a(Array))
    })

    it('works with functions', () => {
      // repro for #178
      earl((v: number) => v + 1).toEqual(earl.a(Function))
    })
  })
})
