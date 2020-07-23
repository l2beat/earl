import { expect as expectEarl } from '../../src'
import { StringMatchingMatcher } from '../../src/matchers/StringMatching'

describe('StringContaining matcher', () => {
  describe('with string', () => {
    it('matches strings containing substring', () => {
      const m = new StringMatchingMatcher('test')

      expectEarl(m.check('abc test cde')).toEqual(true)
      expectEarl(m.check('testtesttest')).toEqual(true)
    })

    it('doesnt match non-strings', () => {
      const m = new StringMatchingMatcher('test')

      expectEarl(m.check(undefined)).toEqual(false)
      expectEarl(m.check(1)).toEqual(false)
      expectEarl(m.check({})).toEqual(false)
      expectEarl(m.check([])).toEqual(false)
    })

    it('doesnt match strings not containing substring', () => {
      const m = new StringMatchingMatcher('test')

      expectEarl(m.check('')).toEqual(false)
      expectEarl(m.check('tes')).toEqual(false)
      expectEarl(m.check('abc-acbc')).toEqual(false)
    })
  })

  describe('with regex', () => {
    it('matches strings matching pattern', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expectEarl(m.check('1323')).toEqual(true)
      expectEarl(m.check('1')).toEqual(true)
    })

    it('doesnt match non-strings', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expectEarl(m.check(undefined)).toEqual(false)
      expectEarl(m.check(1)).toEqual(false)
      expectEarl(m.check({})).toEqual(false)
      expectEarl(m.check([])).toEqual(false)
    })

    it('doesnt match strings not matching pattern', () => {
      const m = new StringMatchingMatcher(new RegExp('^[0-9]+$'))

      expectEarl(m.check('')).toEqual(false)
      expectEarl(m.check('tes')).toEqual(false)
      expectEarl(m.check('123a')).toEqual(false)
    })
  })
})
