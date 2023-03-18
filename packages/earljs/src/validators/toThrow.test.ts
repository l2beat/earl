import { expect } from 'chai'

import { expect as earl } from '../index'
import { captureMochaOutput, stripIndent } from '../test/errors'
import { toThrow } from './toThrow'

describe(toThrow.name, () => {
  class CustomError extends Error {}

  describe('without .not', () => {
    it('passes when function throws any error', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow()
      }).not.to.throw()
    })

    it('passes when function throws an error with a matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow('Some error')
      }).not.to.throw()
    })

    it('passes when function throws an error with a matching class', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).toThrow(CustomError)
      }).not.to.throw()
    })

    it('passes when function throws an error with a matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).toThrow(CustomError, 'Some error')
      }).not.to.throw()
    })

    it('fails when function does not throw an error', () => {
      expect(() => {
        earl(() => {}).toThrow()
      }).to.throw("function call didn't throw an error")
    })

    it('fails when function throws an error with a non-matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow('Different error')
      }).to.throw(
        'function call threw, but the message didn\'t match "Different error"',
      )
    })

    it('fails when function throws an error with a non-matching class', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow(CustomError)
      }).to.throw(
        "function call threw, but the error wasn't an instance of CustomError",
      )
    })

    it('fails when function throws an error with a non-matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).toThrow(Error, 'Different error')
      }).to.throw(
        'function call threw, but the error wasn\'t an instance of Error with message "Different error"',
      )
    })
  })

  describe('with .not', () => {
    it('passes when function does not throw an error', () => {
      expect(() => {
        earl(() => {}).not.toThrow()
      }).not.to.throw()
    })

    it('fails when function throws an error', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).not.toThrow()
      }).to.throw('function call threw an error')
    })

    it('fails when function throws an error with a matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).not.toThrow('Some error')
      }).to.throw('function call threw and the message matched "Some error"')
    })

    it('fails when function throws an error with a matching class', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError)
      }).to.throw(
        'function call threw and the error was an instance of CustomError',
      )
    })

    it('fails when function throws an error with a matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError, 'Some error')
      }).to.throw(
        'function call threw and the error was an instance of CustomError with message "Some error"',
      )
    })
  })

  it('checks partial messages', () => {
    expect(() => {
      earl(() => {
        throw new Error('I like pancakes and waffles')
      }).toThrow('pancakes')
    }).not.to.throw()

    expect(() => {
      earl(() => {
        throw new Error('I like pancakes and waffles')
      }).toThrow('honey')
    }).to.throw('function call threw, but the message didn\'t match "honey"')
  })

  it('supports regular expressions', () => {
    expect(() => {
      earl(() => {
        throw new Error('I like pancakes and waffles')
      }).toThrow(/pan.{4}s/)
    }).not.to.throw()

    expect(() => {
      earl(() => {
        throw new Error('I like pancakes and waffles')
      }).toThrow(/h.{3}y/)
    }).to.throw("function call threw, but the message didn't match /h.{3}y/")
  })

  describe('output', () => {
    it('message regex mismatch', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw new Error('foo')
        }).toThrow(/bar/)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: function call threw, but the message didn't match /bar/

         Error {
        -  message: "foo"
        +  message: /bar/
           name: "Error"
         }
      `)
    })

    it('type and message mismatch', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw new Error('foo')
        }).toThrow(TypeError, 'bar')
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: function call threw, but the error wasn't an instance of TypeError with message "bar"

        -Error {
        -  message: "foo"
        +TypeError {
        +  message: "bar"
           name: "Error"
         }
      `)
    })

    it('non error object thrown value', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw { message: 'foo' }
        }).toThrow(/bar/)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: function call threw, but the message didn't match /bar/

         {
        -  message: "foo"
        +  message: /bar/
         }
      `)
    })

    it('null thrown value', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw null
        }).toThrow(/bar/)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: function call threw, but the message didn't match /bar/

        -null
        +{
        +  message: /bar/
        +}
      `)
    })
  })
})
