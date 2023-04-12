import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toBeA } from './toBeA.js'

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
      }).to.throw(
        'The value 1 is not a string, but it was expected to be a string.',
      )
    })

    it('fails for a value not being a Number', () => {
      expect(() => {
        earl(false).toBeA(Number)
      }).to.throw(
        'The value false is not a number, but it was expected to be a number.',
      )
    })

    it('fails for a value not being a Boolean', () => {
      expect(() => {
        earl(1).toBeA(Boolean)
      }).to.throw(
        'The value 1 is not a boolean, but it was expected to be a boolean.',
      )
    })

    it('fails for a value not being a BigInt', () => {
      expect(() => {
        earl(1).toBeA(BigInt)
      }).to.throw(
        'The value 1 is not a bigint, but it was expected to be a bigint.',
      )
    })

    it('fails for a value not being a Function', () => {
      expect(() => {
        earl(1).toBeA(Function)
      }).to.throw(
        'The value 1 is not a function, but it was expected to be a function.',
      )
    })

    it('fails for a value not being an Object', () => {
      expect(() => {
        earl(1).toBeA(Object)
      }).to.throw(
        'The value 1 is not an object, but it was expected to be an object.',
      )
    })

    it('fails for a value not being a Symbol', () => {
      expect(() => {
        earl(1).toBeA(Symbol)
      }).to.throw(
        'The value 1 is not a symbol, but it was expected to be a symbol.',
      )
    })

    it('fails for a value not being an Array', () => {
      expect(() => {
        earl(1).toBeA(Array)
      }).to.throw(
        'The value 1 is not an array, but it was expected to be an array.',
      )
    })

    it('fails for a value not being a Date', () => {
      expect(() => {
        earl(1).toBeA(Date)
      }).to.throw(
        'The value 1 is not an instance of Date, but it was expected to be an instance of Date.',
      )
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
      }).to.throw(
        'The value "foo" is a string, but it was expected not to be a string.',
      )
    })

    it('fails for a value being a Number', () => {
      expect(() => {
        earl(1).not.toBeA(Number)
      }).to.throw(
        'The value 1 is a number, but it was expected not to be a number.',
      )
    })

    it('fails for a value being a Boolean', () => {
      expect(() => {
        earl(false).not.toBeA(Boolean)
      }).to.throw(
        'The value false is a boolean, but it was expected not to be a boolean.',
      )
    })

    it('fails for a value being a BigInt', () => {
      expect(() => {
        earl(BigInt(5)).not.toBeA(BigInt)
      }).to.throw(
        'The value 5n is a bigint, but it was expected not to be a bigint.',
      )
    })

    it('fails for a value being a Function', () => {
      expect(() => {
        earl(() => {}).not.toBeA(Function)
      }).to.throw(
        'The value function [anonymous]() is a function, but it was expected not to be a function.',
      )
    })

    it('fails for a value being an Object', () => {
      expect(() => {
        earl({ x: 1 }).not.toBeA(Object)
      }).to.throw(
        'The value { x: 1 } is an object, but it was expected not to be an object.',
      )
    })

    it('fails for a value being a Symbol', () => {
      expect(() => {
        earl(Symbol('foo')).not.toBeA(Symbol)
      }).to.throw(
        'The value Symbol(foo) is a symbol, but it was expected not to be a symbol.',
      )
    })

    it('fails for a value being an Array', () => {
      expect(() => {
        earl([1, 2]).not.toBeA(Array)
      }).to.throw(
        'The value [1, 2] is an array, but it was expected not to be an array.',
      )
    })

    it('fails for a value being a Date', () => {
      expect(() => {
        earl(new Date('2023-01-01')).not.toBeA(Date)
      }).to.throw(
        'The value Date 2023-01-01 is an instance of Date, but it was expected not to be an instance of Date.',
      )
    })
  })
})
