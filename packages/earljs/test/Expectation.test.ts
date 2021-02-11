import { expect } from 'chai'
import sinon from 'sinon'

import { Expectation, getControl, loadValidators } from '../src/Expectation'
import { clearModuleCache } from './common'

describe('assert', () => {
  const success = { success: true, reason: 'Failure', negatedReason: 'Negated failure' }
  const failure = { success: false, reason: 'Failure', negatedReason: 'Negated failure' }

  describe('when not negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined)

    it('doesnt throw when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).to.throw('Failure')
    })
  })

  describe('when negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined).not

    it('throws when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).to.throw('Negated failure')
    })

    it('does not throw when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).not.to.throw()
    })
  })

  describe('when negated "aside"', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined)
    expectation.not

    it('doesnt throw when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).to.throw('Failure')
    })
  })

  describe('when negated multiple times (even number)', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined).not.not

    it('does not throw when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).to.throw('Failure')
    })
  })

  describe('when negated multiple times (odd number)', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined).not.not.not

    it('throws when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).to.throw('Negated failure')
    })

    it('does not throw when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).not.to.throw('Failure')
    })
  })

  describe('fail', () => {
    it('throws when not negated', () => {
      const expectation = new Expectation(sinon.spy(), undefined, undefined)
      expect(() => getControl(expectation).fail({ reason: 'foo' })).to.throw('foo')
    })

    it('throws when negated', () => {
      const expectation = new Expectation(sinon.spy(), undefined, undefined).not
      expect(() => getControl(expectation).fail({ reason: 'foo' })).to.throw('foo')
    })
  })

  type ExpectationType = typeof Expectation
  type loadValidatorsType = typeof loadValidators
  describe('plugin', () => {
    let Expectation: ExpectationType
    let loadValidators: loadValidatorsType
    beforeEach(() => {
      clearModuleCache()
      ;({ Expectation, loadValidators } = require('../src/Expectation'))
    })

    afterEach(clearModuleCache)

    it('adds new validators', () => {
      function totallyNewValidator(this: any) {
        const ctrl = this.getControl()
        ctrl.assert({ success: false, reason: 'fail', negatedReason: 'fail' })
      }
      loadValidators({ totallyNewValidator })

      const expectation = new Expectation(undefined, undefined, undefined)

      expect((expectation as any).totallyNewValidator).to.be.instanceOf(Function)
      expect(() => (expectation as any).totallyNewValidator()).to.throw('fail')
    })

    it('clears cache correctly', () => {
      const expectation = new Expectation(undefined, undefined, undefined)

      expect((expectation as any).totallyNewValidator).to.be.undefined
    })
  })
})
