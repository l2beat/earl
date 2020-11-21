import { expect } from 'chai'

import { expect as earl } from '../../src'

function functionThatThrows() {
  throw new Error('Horrible error!')
}

function functionThatDoesntThrow() {}

class HttpError extends Error {
  constructor(code: number) {
    super(`Http Error: ${code}`)
  }
}

describe('toThrow', () => {
  describe('not negated', () => {
    it('catches desired exception', () => {
      earl(() => functionThatThrows()).toThrow('Horrible error!')
    })

    it('catches any exception when arg omitted', () => {
      earl(() => functionThatThrows()).toThrow()
    })

    it('fails when unexpected exception was thrown', () => {
      const test = () => earl(() => functionThatDoesntThrow()).toThrow()

      expect(test).to.throw("Expected to throw but didn't")
    })

    it('fails when exception with different error message was thrown', () => {
      const test = () => earl(() => functionThatThrows()).toThrow('Critical error!') // error message mismatch

      expect(test).to.throw('Expected to throw "Error: Critical error!" but threw "Error: Horrible error!"')
    })
  })

  describe('negated', () => {
    it('catches desired exception', () => {
      earl(() => functionThatThrows()).not.toThrow('Critical error!')
    })

    it('catches any exception when arg omitted', () => {
      earl(() => functionThatDoesntThrow()).not.toThrow()
    })

    it('fails when unexpected exception was thrown', () => {
      const test = () => earl(() => functionThatThrows()).not.toThrow()
      expect(test).to.throw(`Expected not to throw "[Anything]" but threw "Error: Horrible error!"`)
    })

    it('fails when exception with different error message was thrown', () => {
      const test = () => earl(() => functionThatThrows()).not.toThrow('Horrible error!') // error message mismatch

      expect(test).to.throw('Expected not to throw "Error: Horrible error!" but threw "Error: Horrible error!"')
    })
  })

  describe('with error matcher', () => {
    it('works with partial error messages', () => {
      const test = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow(earl.stringMatching('Test'))

      expect(test).not.to.throw()
    })

    it('works with custom error classes', () => {
      const test = () =>
        earl(() => {
          throw new HttpError(500)
        }).toThrow(HttpError)

      expect(test).not.to.throw()
    })

    it('works with custom error classes with error messages', () => {
      const test = () =>
        earl(() => {
          throw new HttpError(500)
        }).toThrow(HttpError, earl.stringMatching('Http Error'))

      expect(test).not.to.throw()
    })

    it('throws when error messages doesnt match', () => {
      const test = () =>
        earl(() => {
          throw new Error('500')
        }).toThrow(HttpError)

      expect(test).to.throw('Expected to throw "HttpError" but threw "Error: 500"')
    })
  })
})
