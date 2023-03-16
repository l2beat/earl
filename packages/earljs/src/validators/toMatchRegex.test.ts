import { expect } from 'chai'

import { expect as earl } from '../index'
import { toMatchRegex } from './toMatchRegex'

describe(toMatchRegex.name, () => {
  describe('without .not', () => {
    it('passes for a value that matches the regex', () => {
      expect(() => {
        earl('foo').toMatchRegex(/f/)
      }).not.to.throw()
    })

    it('fails for a value that does not match the regex', () => {
      expect(() => {
        earl('bar').toMatchRegex(/f/)
      }).to.throw('"bar" doesn\'t match /f/')
    })
  })

  describe('with .not', () => {
    it('fails for a value that matches the regex', () => {
      expect(() => {
        earl('foo').not.toMatchRegex(/f/)
      }).to.throw('"foo" matches /f/')
    })

    it('passes for a value that does not match the regex', () => {
      expect(() => {
        earl('bar').not.toMatchRegex(/f/)
      }).not.to.throw()
    })
  })
})
