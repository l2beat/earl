import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toThrow', () => {
  describe('autofix', () => {
    it.skip('works when no value was provided')
  })

  describe('with msg string', () => {
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
