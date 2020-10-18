import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toThrow', () => {
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
