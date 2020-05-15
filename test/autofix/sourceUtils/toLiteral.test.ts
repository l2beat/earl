import { expect } from 'chai'

import { toLiteral } from '../../../src/autofix/sourceUtils'

describe('toLiteral', () => {
  it('transforms objects', () => {
    const input = {
      abc: 5,
      nested: {
        a: null,
      },
    }

    expect(toLiteral(input)).to.be.deep.eq('{"abc":5,"nested":{"a":null,},}')
  })

  it('transforms primitive values', () => {
    expect(toLiteral('abc')).to.be.deep.eq('"abc"')
    expect(toLiteral(5)).to.be.deep.eq('5')
    expect(toLiteral(true)).to.be.deep.eq('true')
    expect(toLiteral(null)).to.be.deep.eq('null')
    expect(toLiteral(undefined)).to.be.deep.eq('undefined')
  })

  it('transforms custom classes', () => {
    class DummyClass {
      constructor(readonly value1: number) {}
    }
    const input = new DummyClass(5)

    expect(toLiteral(input)).to.be.deep.eq('expect.a(DummyClass)')
  })

  it.skip('prettifies output')
})
