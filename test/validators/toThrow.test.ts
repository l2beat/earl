import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toThrow', () => {
  describe('with msg string', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow('Test msg')

      expect(run).not.to.throw()
    })

    it('throws on msg mismatch', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow('Dummy msg')

      expect(run).to.throw('Expected to throw "Dummy msg" but didn\'t')
    })

    it.skip('works when negated', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow('Dummy msg')

      expect(run).not.to.throw()
    })

    it.skip('throws when negated and msg match', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow('Test msg')

      expect(run).not.to.throw()
    })
  })

  describe('without args', () => {
    it('works', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).toThrow()

      expect(run).not.to.throw()
    })

    it('works when negated', () => {
      const run = () => earl(() => {}).not.toThrow()

      expect(run).not.to.throw()
    })

    it('throws when shouldnt throw', () => {
      const run = () =>
        earl(() => {
          throw new Error('Test msg')
        }).not.toThrow()

      expect(run).to.throw('Expected not to throw but threw Error: Test msg')
    })

    it('throws when expected not to throw but threw', () => {
      const run = () => earl(() => {}).toThrow()

      expect(run).to.throw("Expected to throw but didn't")
    })
  })
})
