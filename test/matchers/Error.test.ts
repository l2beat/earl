import { expect as expectEarl } from '../../src'
import { ErrorMatcher } from '../../src/matchers/Error'
import { StringMatchingMatcher } from '../../src/matchers/StringMatching'

describe('Error matcher', () => {
  it('matches any errors when no msgs was provided', () => {
    const m = new ErrorMatcher(Error)

    expectEarl(m.check(new Error('bye world'))).toEqual(true)
  })

  it('matches errors with msgs', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expectEarl(m.check(new Error('bye world'))).toEqual(true)
  })

  it('doesnt match errors with different msgs', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expectEarl(m.check(new Error('hello world'))).toEqual(false)
  })

  it('doesnt match non-errors', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expectEarl(m.check('123')).toEqual(false)
  })

  it('matches errors with matchers', () => {
    const m = new ErrorMatcher(Error, StringMatchingMatcher.make('world'))

    expectEarl(m.check(new Error('hello world'))).toEqual(true)
  })

  describe('with custom error class', () => {
    class HttpError extends Error {
      constructor(private readonly code: number) {
        super(`Http Error: ${code}`)
      }
    }

    it('matches custom error classes', () => {
      const m = new ErrorMatcher(HttpError)

      expectEarl(m.check(new HttpError(500))).toEqual(true)
    })

    it('matches custom error classes with error messages', () => {
      const m = new ErrorMatcher(HttpError, 'Http Error: 500')

      expectEarl(m.check(new HttpError(500))).toEqual(true)
    })

    it('doesnt match when custom error classes are different', () => {
      const m = new ErrorMatcher(HttpError)

      expectEarl(m.check(new Error('500'))).toEqual(false)
    })

    it('doesnt match custom error classes with mismatched error messages', () => {
      const m = new ErrorMatcher(HttpError, 'Http Error: 501')

      expectEarl(m.check(new HttpError(500))).toEqual(false)
    })
  })
})
