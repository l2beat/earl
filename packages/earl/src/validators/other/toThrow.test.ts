import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { captureMochaOutput, stripIndent } from '../../test/errors.js'
import { toThrow } from './toThrow.js'

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
        'The function call did not throw an error, but it was expected to.',
      )
    })

    it('fails when function throws an error with a non-matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow('Different error')
      }).to.throw(
        'The function call threw a message that did not match "Different error", but it was expected to.',
      )
    })

    it('fails when function throws an error with a non-matching class', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).toThrow(CustomError)
      }).to.throw(
        'The function call threw an error that was not an instance of CustomError, but it was expected to be.',
      )
    })

    it('fails when function throws an error with a non-matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).toThrow(Error, 'Different error')
      }).to.throw(
        'The function call threw an error that was not an instance of Error with the message "Different error", but it was expected to be.',
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
      }).to.throw(
        'The function call threw an error, but it was expected not to.',
      )
    })

    it('fails when function throws an error with a matching message', () => {
      expect(() => {
        earl(() => {
          throw new Error('Some error')
        }).not.toThrow('Some error')
      }).to.throw(
        'The function call threw a message matching "Some error", but it was expected not to.',
      )
    })

    it('fails when function throws an error with a matching class', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError)
      }).to.throw(
        'The function call threw an instance of CustomError, but it was expected not to.',
      )
    })

    it('fails when function throws an error with a matching class and message', () => {
      expect(() => {
        earl(() => {
          throw new CustomError('Some error')
        }).not.toThrow(CustomError, 'Some error')
      }).to.throw(
        'The function call threw an instance of CustomError with the message "Some error", but it was expected not to.',
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
      'The function call threw a message that did not match "honey", but it was expected to.',
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
      'The function call threw a message that did not match /h.{3}y/, but it was expected to.',
    )
  })

  it('informs the user about async function handling', () => {
    expect(() => {
      earl(async () => {
        throw new Error('Some error')
      }).toThrow()
    }).to.throw(
      'The function call returned a promise. To make this assertion work with async functions replace toThrow with toBeRejected and add await.',
    )

    expect(() => {
      earl(async () => {
        throw new Error('Some error')
      }).toThrow('Some error')
    }).to.throw(
      'The function call returned a promise. To make this assertion work with async functions replace toThrow with toBeRejectedWith and add await.',
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
        The function call threw a message that did not match /bar/, but it was expected to.

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
        The function call threw an error that was not an instance of TypeError, but it was expected to be.

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
        The function call threw an error that was not an instance of TypeError with the message "bar", but it was expected to be.

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
        The function call threw a message that did not match /bar/, but it was expected to.

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
        The function call threw a message that did not match /bar/, but it was expected to.

        -undefined
        +/bar/
      `)
    })
  })
})
