import { expect } from 'chai'

import { expect as earl } from '../index'
import { toBeA } from './toBeA'

describe(toBeA.name, () => {
  describe('without .not', () => {
    it('passes for a primitive matching the type', () => {
      expect(() => {
        earl(1).toBeA(Number)
      }).not.to.throw()
    })

    it('fails for a value not being a String', () => {
      expect(() => {
        earl(1).toBeA(String)
      }).to.throw("1 isn't a string")
    })

    it('fails for a value not being a Number', () => {
      expect(() => {
        earl(false).toBeA(Number)
      }).to.throw("false isn't a number")
    })

    it('fails for a value not being a Boolean', () => {
      expect(() => {
        earl(1).toBeA(Boolean)
      }).to.throw("1 isn't a boolean")
    })

    it('fails for a value not being a BigInt', () => {
      expect(() => {
        earl(1).toBeA(BigInt)
      }).to.throw("1 isn't a bigint")
    })

    it('fails for a value not being a Function', () => {
      expect(() => {
        earl(1).toBeA(Function)
      }).to.throw("1 isn't a function")
    })

    it('fails for a value not being an Object', () => {
      expect(() => {
        earl(1).toBeA(Object)
      }).to.throw("1 isn't an object")
    })

    it('fails for a value not being a Symbol', () => {
      expect(() => {
        earl(1).toBeA(Symbol)
      }).to.throw("1 isn't a symbol")
    })

    it('fails for a value not being an Array', () => {
      expect(() => {
        earl(1).toBeA(Array)
      }).to.throw("1 isn't an array")
    })

    it('fails for a value not being a Date', () => {
      expect(() => {
        earl(1).toBeA(Date)
      }).to.throw("1 isn't an instance of Date")
    })
  })

  describe('with .not', () => {
    it('passes for a primitive not matching the type', () => {
      expect(() => {
        earl(1).not.toBeA(String)
      }).not.to.throw()
    })

    it('fails for a value being a String', () => {
      expect(() => {
        earl('foo').not.toBeA(String)
      }).to.throw('"foo" is a string')
    })

    it('fails for a value being a Number', () => {
      expect(() => {
        earl(1).not.toBeA(Number)
      }).to.throw('1 is a number')
    })

    it('fails for a value being a Boolean', () => {
      expect(() => {
        earl(false).not.toBeA(Boolean)
      }).to.throw('false is a boolean')
    })

    it('fails for a value being a BigInt', () => {
      expect(() => {
        earl(BigInt(5)).not.toBeA(BigInt)
      }).to.throw('5n is a bigint')
    })

    it('fails for a value being a Function', () => {
      expect(() => {
        earl(() => {}).not.toBeA(Function)
      }).to.throw('function [anonymous]() is a function')
    })

    it('fails for a value being an Object', () => {
      expect(() => {
        earl({ x: 1 }).not.toBeA(Object)
      }).to.throw('{ x: 1 } is an object')
    })

    it('fails for a value being a Symbol', () => {
      expect(() => {
        earl(Symbol('foo')).not.toBeA(Symbol)
      }).to.throw('Symbol(foo) is a symbol')
    })

    it('fails for a value being an Array', () => {
      expect(() => {
        earl([1, 2]).not.toBeA(Array)
      }).to.throw('[1, 2] is an array')
    })

    it('fails for a value being a Date', () => {
      expect(() => {
        earl(new Date('2023-01-01')).not.toBeA(Date)
      }).to.throw('Date 2023-01-01T00:00:00.000Z is an instance of Date')
    })
  })
})
