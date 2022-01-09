import { expect } from 'chai'

import { expect as earlExpect } from '../../src'
import { ObjectWithMatcher } from '../../src/matchers/ObjectWith'

describe('ObjectWith matcher', () => {
  it('does not match non-objects', () => {
    const m = new ObjectWithMatcher({})

    expect(m.check(undefined)).to.be.false
    expect(m.check(null)).to.be.false
    expect(m.check(0)).to.be.false
    expect(m.check('')).to.be.false
    expect(m.check(false)).to.be.false
  })

  it('matches objects', () => {
    const m = new ObjectWithMatcher({})

    expect(m.check({})).to.be.true
  })

  it('matches objects with a single key-value pair', () => {
    const m = new ObjectWithMatcher({ a: 1 })

    expect(m.check({ a: 1 })).to.be.true
    expect(m.check({ a: '1' })).to.be.false
    expect(m.check({ b: 2 })).to.be.false

    expect(m.check({ a: 1, b: 2 })).to.be.true
    expect(m.check({ b: 2, a: 1 })).to.be.true

    expect(m.check({ a: 1, b: 2, c: 3 })).to.be.true
    expect(m.check({ c: 3, b: 2, a: 1 })).to.be.true
  })

  it('matches objects with many key-value pairs', () => {
    const m = new ObjectWithMatcher({ a: 1, b: '2' })

    expect(m.check({ a: 1 })).to.be.false
    expect(m.check({ b: '2' })).to.be.false

    expect(m.check({ a: 1, b: '2' })).to.be.true
    expect(m.check({ b: '2', a: 1 })).to.be.true

    expect(m.check({ a: 1, b: '2', c: 3 })).to.be.true
    expect(m.check({ c: 3, b: '2', a: 1 })).to.be.true
  })

  it('matches classes instances', () => {
    class DummyClass {
      constructor(public a: number, public b: number) {}
    }

    const m = new ObjectWithMatcher({ a: 1 })

    expect(m.check(new DummyClass(1, 2))).to.be.true
  })

  describe('in expectation', () => {
    it('works with objects', () => {
      earlExpect({}).toEqual(earlExpect.objectWith({}))
      earlExpect({ a: 1 }).toEqual(earlExpect.objectWith({ a: 1 }))
      earlExpect({ a: 1, b: '2' }).toEqual(earlExpect.objectWith({ a: 1, b: '2' }))

      earlExpect({}).not.toEqual(earlExpect.objectWith({ a: 1 }))

      earlExpect({ a: 1 }).not.toEqual(earlExpect.objectWith({ a: '2' }))
      earlExpect({ a: 1 }).not.toEqual(earlExpect.objectWith({ b: 1 }))
      earlExpect({ a: 1 as const }).not.toEqual(earlExpect.objectWith({ a: 2 as const }))
      earlExpect({ a: 1, b: '2' }).toEqual(earlExpect.objectWith({ a: 1 }))
    })

    it('works with nested matchers', () => {
      earlExpect({ a: 1 }).toEqual(earlExpect.objectWith({ a: earlExpect.numberCloseTo(2, { delta: 1 }) }))

      earlExpect({ a: 1, b: '2' }).toEqual(
        earlExpect.objectWith({
          a: earlExpect.numberCloseTo(2, { delta: 1 }),
          b: earlExpect.stringMatching('2'),
        }),
      )
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earlExpect({ a: 1 }).toEqual(earlExpect.objectWith({ a: earlExpect.numberCloseTo(3, { delta: 1 }) })),
      ).to.throw('{ a: 1 } not equal to Matcher')
    })
  })
})
