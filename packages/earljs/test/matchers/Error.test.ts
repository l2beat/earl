import { expect } from 'chai'

import { ErrorMatcher } from '../../src/matchers/Error'
import { StringMatchingMatcher } from '../../src/matchers/StringMatching'

describe('Error matcher', () => {
  it('matches any errors when no msgs was provided', () => {
    const m = new ErrorMatcher(Error)

    expect(m.check(new Error('bye world'))).to.be.true
  })

  it('matches errors with msgs', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expect(m.check(new Error('bye world'))).to.be.true
  })

  it('doesnt match errors with different msgs', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expect(m.check(new Error('hello world'))).to.be.false
  })

  it('doesnt match non-errors', () => {
    const m = new ErrorMatcher(Error, 'bye world')

    expect(m.check('123')).to.be.false
  })

  it('matches errors with matchers', () => {
    const m = new ErrorMatcher(Error, StringMatchingMatcher.make('world'))

    expect(m.check(new Error('hello world'))).to.be.true
  })

  describe('with custom error class', () => {
    class HttpError extends Error {
      constructor(private readonly code: number) {
        super(`Http Error: ${code}`)
      }
    }

    it('matches custom error classes', () => {
      const m = new ErrorMatcher(HttpError)

      expect(m.check(new HttpError(500))).to.be.true
    })

    it('matches custom error classes with error messages', () => {
      const m = new ErrorMatcher(HttpError, 'Http Error: 500')

      expect(m.check(new HttpError(500))).to.be.true
    })

    it('doesnt match when custom error classes are different', () => {
      const m = new ErrorMatcher(HttpError)

      expect(m.check(new Error('500'))).to.be.false
    })

    it('doesnt match custom error classes with mismatched error messages', () => {
      const m = new ErrorMatcher(HttpError, 'Http Error: 501')

      expect(m.check(new HttpError(500))).to.be.false
    })
  })

  it('describes itself', () => {
    const m = new ErrorMatcher(Error, StringMatchingMatcher.make('world'))

    expect(m.toString()).to.eq('[Error: Error(Matcher)]')
  })
})
