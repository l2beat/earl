import { expect as expectEarl } from '../../src'
import { toLiteral } from '../../src/autofix/toLiteral'

describe('toLiteral', () => {
  it('transforms primitive values', () => {
    expectEarl(toLiteral('abc')).toEqual('"abc"')
    expectEarl(toLiteral(5)).toEqual('5')
    expectEarl(toLiteral(true)).toEqual('true')
    expectEarl(toLiteral(null)).toEqual('null')
    expectEarl(toLiteral(undefined)).toEqual('undefined')
  })

  it('transforms objects', () => {
    const input = {
      abc: 5,
      nested: {
        c: 5,
        a: null,
      },
    }

    expectEarl(toLiteral(input)).toEqual('{"abc":5,"nested":{"a":null,"c":5,},}')
  })

  it('transforms arrays', () => {
    const input = [
      {
        abc: 5,
        nested: {
          a: null,
        },
      },
      'a string',
    ]

    expectEarl(toLiteral(input)).toEqual('[{"abc":5,"nested":{"a":null,},},"a string"]')
  })

  it('transforms custom classes', () => {
    class DummyClass {
      constructor(readonly value1: number) {}
    }
    const input = new DummyClass(5)

    expectEarl(toLiteral(input)).toEqual('expect.a(DummyClass)')
  })

  it('transforms errors to error matcher', () => {
    const input = new Error('Goodbye cruel world!')

    expectEarl(toLiteral(input)).toEqual('expect.error("Goodbye cruel world!")')
  })

  it.skip('prettifies output')
})
