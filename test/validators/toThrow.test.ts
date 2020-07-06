import { expect } from 'chai'
import { spy } from 'sinon'

import { expect as earl, expect as expectEarl } from '../../src'
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
      expectEarl(dummyAutofix.args[0][0]).toEqual('toThrow')
      expectEarl(dummyAutofix.args[0][1].message).toEqual('Goodbye cruel world!')
    })

    it('does not call autofix when expectation was provided', () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, () => {})

      expectEarl(() => e.toThrow(earl.anything())).toThrow(expectEarl.error("Expected to throw but didn't"))
      expect(dummyAutofix).not.to.be.called
    })

    it('does not call autofix when expectation wasnt provided but it didnt throw', () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, () => {})

      expectEarl(() => e.toThrow()).toThrow(expectEarl.error("Expected to throw but didn't"))
      expect(dummyAutofix).not.to.be.called
    })
  })

  describe('with error matcher', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error('Test msg'))

      expectEarl(run).not.toThrow()
    })

    it('throws on msg mismatch', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error('Dummy msg'))

      expectEarl(run).toThrow(expectEarl.error('Expected to throw "Error: Dummy msg" but threw "Error: Test msg"'))
    })

    it('works when negated', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow('Dummy msg')

      expectEarl(run).not.toThrow()
    })

    it('throws when negated and msg match', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow(earl.error('Test msg'))

      expectEarl(run).toThrow(expectEarl.error('Expected not to throw "Error: Test msg" but threw "Error: Test msg"'))
    })

    it('works with partial error messages', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.error(earl.stringMatching('Test')))

      expectEarl(run).not.toThrow()
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

      expectEarl(run).not.toThrow()
    })

    it('works with custom error classes with error messages', () => {
      const run = () =>
        earl(() => {
          throw new HttpError(500)
        }).toThrow(earl.error(HttpError, earl.stringMatching('Http Error')))

      expectEarl(run).not.toThrow()
    })

    it('throws when error messages doesnt match', () => {
      const run = () =>
        earl(() => {
          throw new Error('500')
        }).toThrow(earl.error(HttpError))

      expectEarl(run).toThrow(expectEarl.error('Expected to throw "HttpError" but threw "Error: 500"'))
    })
  })

  describe('with anything', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.anything())

      expectEarl(run).not.toThrow()
    })

    it('works when negated', () => {
      const run = () => earl(() => {}).not.toThrow(earl.anything())

      expectEarl(run).not.toThrow()
    })

    it('throws when shouldnt throw', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow(earl.anything())

      expectEarl(run).toThrow(expectEarl.error('Expected not to throw "[Anything]" but threw "Error: Test msg"'))
    })

    it('throws when expected not to throw but threw', () => {
      const run = () => earl(() => {}).toThrow(earl.anything())

      expectEarl(run).toThrow(expectEarl.error("Expected to throw but didn't"))
    })
  })
})
