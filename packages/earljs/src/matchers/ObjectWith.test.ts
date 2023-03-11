import { expect } from 'chai'

import { expect as earl } from '../expect'
import { ObjectWithMatcher } from './ObjectWith'

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
      earl({}).toEqual(earl.objectWith({}))
      earl({ a: 1 }).toEqual(earl.objectWith({ a: 1 }))
      earl({ a: 1, b: '2' }).toEqual(earl.objectWith({ a: 1, b: '2' }))

      earl({}).not.toEqual(earl.objectWith({ a: 1 }))

      earl({ a: 1 }).not.toEqual(earl.objectWith({ a: '2' }))
      earl({ a: 1 }).not.toEqual(earl.objectWith({ b: 1 }))
      earl({ a: 1 as const }).not.toEqual(earl.objectWith({ a: 2 as const }))
      earl({ a: 1, b: '2' }).toEqual(earl.objectWith({ a: 1 }))
    })

    it('works with nested matchers', () => {
      earl({ a: 1 }).toEqual(
        earl.objectWith({ a: earl.numberCloseTo(2, { delta: 1 }) }),
      )

      earl({ a: 1, b: '2' }).toEqual(
        earl.objectWith({
          a: earl.numberCloseTo(2, { delta: 1 }),
          b: earl.stringMatching('2'),
        }),
      )
    })

    it('throws understandable error messages', () => {
      expect(() =>
        earl({ a: 1 }).toEqual(
          earl.objectWith({
            a: earl.numberCloseTo(3, { delta: 1 }),
          }),
        ),
      ).to.throw('{ a: 1 } not equal to Matcher')
    })
  })
})
