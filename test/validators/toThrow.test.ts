import { expect } from 'chai'
import { spy } from 'sinon'

import { expect as earl } from '../../src'
import { Expectation } from '../../src/Expectation'

describe('toThrow', () => {
  describe('autofix', () => {
    it('calls autofix on missing values', () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, () => {
        throw new Error('Goodbye cruel world!')
      })

      e.toThrow()

      expect(dummyAutofix).to.be.calledOnce
      // grrr this is ugly, I hope we will rewrite these tests to earl soon :->
      expect(dummyAutofix.args[0][0]).to.be.eq('toThrow')
      expect(dummyAutofix.args[0][1].message).to.be.eq('Goodbye cruel world!')
    })

    it('does not call autofix when expectation was provided', () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, () => {})

      expect(() => e.toThrow(earl.anything())).to.throw()
      expect(dummyAutofix).not.to.be.called
    })

    it('does not call autofix when expectation wasnt provided but it didnt throw', () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, () => {})

      expect(() => e.toThrow()).to.throw("Expected to throw but didn't")
      expect(dummyAutofix).not.to.be.called
    })
  })

  describe('with error matcher', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error('Test msg'))

      expect(run).not.to.throw()
    })

    it('throws on msg mismatch', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error('Dummy msg'))

      expect(run).to.throw('Expected to throw "Error: Dummy msg" but threw "Error: Test msg"')
    })

    it('works when negated', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow('Dummy msg')

      expect(run).not.to.throw()
    })

    it('throws when negated and msg match', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow(earl.error('Test msg'))

      expect(run).to.throw('Expected not to throw "Error: Test msg" but threw "Error: Test msg"')
    })

    it('works with partial error messages', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error(earl.stringMatching('Test')))

      expect(run).not.to.throw()
    })

    class HttpError extends Error {
      constructor(private readonly code: number) {
        super(`Http Error: ${code}`)
      }
    }

    it('works with custom error classes', () => {
      const run = () =>
        earl(() => {
          throw new HttpError(500)
        }).toThrow(earl.error(HttpError))

      expect(run).not.to.throw()
    })

    it('works with custom error classes with error messages', () => {
      const run = () =>
        earl(() => {
          throw new HttpError(500)
        }).toThrow(earl.error(HttpError, earl.stringMatching('Http Error')))

      expect(run).not.to.throw()
    })

    it('throws when error messages doesnt match', () => {
      const run = () =>
        earl(() => {
          throw new Error('500')
        }).toThrow(earl.error(HttpError))

      expect(run).to.throw('Expected to throw "HttpError" but threw "Error: 500"')
    })
  })

  describe('with anything', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.anything())

      expect(run).not.to.throw()
    })

    it('works when negated', () => {
      const run = () => earl(() => {}).not.toThrow(earl.anything())

      expect(run).not.to.throw()
    })

    it('throws when shouldnt throw', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow(earl.anything())

      expect(run).to.throw('Expected not to throw "[Anything]" but threw "Error: Test msg"')
    })

    it('throws when expected not to throw but threw', () => {
      const run = () => earl(() => {}).toThrow(earl.anything())

      expect(run).to.throw("Expected to throw but didn't")
    })
  })
})
