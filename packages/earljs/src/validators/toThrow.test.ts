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
      }).to.throw(
        'Function call did not throw an error, but it was expected to.',
      )
    })

    it('fails when function throws an error with a non-matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow('Different error')
      }).to.throw(
        'Function call threw, but the message did not match "Different error" and it was expected to.',
      )
    })

    it('fails when function throws an error with a non-matching class', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow(CustomError)
      }).to.throw(
        'Function call threw, but the error was not an instance of CustomError and it was expected to be.',
      )
    })

    it('fails when function throws an error with a non-matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).toThrow(Error, 'Different error')
      }).to.throw(
        'Function call threw, but the error was not an instance of Error with message "Different error" and it was expected to be.',
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
      }).to.throw('Function call threw an error, but it was not expected to.')
    })

    it('fails when function throws an error with a matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).not.toThrow('Some error')
      }).to.throw(
        'Function call threw and the message matched "Some error", but it was not expected to.',
      )
    })

    it('fails when function throws an error with a matching class', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError)
      }).to.throw(
        'Function call threw and the error was an instance of CustomError, but it was not expected to be.',
      )
    })

    it('fails when function throws an error with a matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError, 'Some error')
      }).to.throw(
        'Function call threw and the error was an instance of CustomError with message "Some error", but it was not expected to be.',
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
    }).to.throw(
      'Function call threw, but the message did not match "honey" and it was expected to.',
    )
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
    }).to.throw(
      'Function call threw, but the message did not match /h.{3}y/ and it was expected to.',
    )
  })

  describe('output', () => {
    it('message regex mismatch', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw new Error('foo')
        }).toThrow(/bar/)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: Function call threw, but the message did not match /bar/ and it was expected to.

        -"foo"
        +/bar/
      `)
    })

    it('type mismatch', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw new Error('foo')
        }).toThrow(TypeError)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: Function call threw, but the error was not an instance of TypeError and it was expected to be.

        -Error
        +TypeError
      `)
    })

    it('type and message mismatch', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw new Error('foo')
        }).toThrow(TypeError, 'bar')
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: Function call threw, but the error was not an instance of TypeError with message "bar" and it was expected to be.

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
        AssertionError: Function call threw, but the message did not match /bar/ and it was expected to.

        -"foo"
        +/bar/
      `)
    })

    it('null thrown value', () => {
      const diff = captureMochaOutput(() => {
        earl(() => {
          throw null
        }).toThrow(/bar/)
      })

      expect(diff).to.equal(stripIndent`
        AssertionError: Function call threw, but the message did not match /bar/ and it was expected to.

        -undefined
        +/bar/
      `)
    })
  })
})
