import { expect as expectEarl } from '../../src'
import { AMatcher } from '../../src/matchers/A'

describe('A matcher', () => {
  it('should match string', () => {
    const m = new AMatcher(String)

    expectEarl(m.check('m')).toEqual(true)
    // eslint-disable-next-line
    expectEarl(m.check(new String('green'))).toEqual(true)

    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check(1)).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match numbers', () => {
    const m = new AMatcher(Number)

    expectEarl(m.check(5)).toEqual(true)
    // eslint-disable-next-line
    expectEarl(m.check(new Number(5))).toEqual(true)

    expectEarl(m.check(NaN)).toEqual(false)
    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check([])).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match boolean', () => {
    const m = new AMatcher(Boolean)

    expectEarl(m.check(true)).toEqual(true)
    // eslint-disable-next-line
    expectEarl(m.check(new Boolean(false))).toEqual(true)

    expectEarl(m.check(5)).toEqual(false)
    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check([])).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match bigint', () => {
    const m = new AMatcher(BigInt)

    expectEarl(m.check(5n)).toEqual(true)
    expectEarl(m.check(BigInt(5))).toEqual(true)

    expectEarl(m.check(5)).toEqual(false)
    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check([])).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match function', () => {
    const m = new AMatcher(Function)

    expectEarl(m.check(() => {})).toEqual(true)

    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check([])).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match object', () => {
    const m = new AMatcher(Object)

    expectEarl(m.check({})).toEqual(true)
    // eslint-disable-next-line
    expectEarl(m.check(new Object({ m: 5 }))).toEqual(true)
    expectEarl(m.check([])).toEqual(true)

    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
  })

  it('should match symbol', () => {
    // eslint-disable-next-line
    const m = new AMatcher(Symbol)

    // eslint-disable-next-line
    expectEarl(m.check(Symbol())).toEqual(true)

    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check([])).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })

  it('should match an array', () => {
    const m = new AMatcher(Array)

    expectEarl(m.check([])).toEqual(true)

    expectEarl(m.check(5)).toEqual(false)
    expectEarl(m.check(undefined)).toEqual(false)
    expectEarl(m.check(null)).toEqual(false)
    expectEarl(m.check({})).toEqual(false)
  })
})
