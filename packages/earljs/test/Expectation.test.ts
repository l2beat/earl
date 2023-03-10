import { expect } from 'chai'
import sinon from 'sinon'

import { __ExpectationImplementation, getControl, loadValidators } from '../src/Expectation'
import { clearModuleCache } from './common'

// @todo: could we refactor these tests to test public API instead of __ExpectationImplementation?
describe('assert', () => {
  const success = { success: true, reason: 'Failure', negatedReason: 'Negated failure' }
  const failure = { success: false, reason: 'Failure', negatedReason: 'Negated failure' }

  describe('when not negated', () => {
    const expectation = __ExpectationImplementation.make(sinon.spy(), undefined, undefined)

    it('doesnt throw when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).to.throw('Failure')
    })
  })

  describe('when negated', () => {
    const expectation = __ExpectationImplementation.make(sinon.spy(), undefined, undefined).not

    it('throws when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).to.throw('Negated failure')
    })

    it('does not throw when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).not.to.throw()
    })
  })

  describe('when negated "aside"', () => {
    const expectation = __ExpectationImplementation.make(sinon.spy(), undefined, undefined)
    expectation.not

    it('doesnt throw when validation was successful', () => {
      expect(() => getControl(expectation).assert(success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => getControl(expectation).assert(failure)).to.throw('Failure')
    })
  })

  describe('when negated multiple times', () => {
    it('throws when negated more than once', () => {
      expect(() => __ExpectationImplementation.make(sinon.spy(), undefined, undefined).not.not).to.throw(
        'Tried negating an already negated expectation',
      )
    })
  })

  describe('fail', () => {
    it('throws when not negated', () => {
      const expectation = __ExpectationImplementation.make(sinon.spy(), undefined, undefined)
      expect(() => getControl(expectation).fail({ reason: 'foo' })).to.throw('foo')
    })

    it('throws when negated', () => {
      const expectation = __ExpectationImplementation.make(sinon.spy(), undefined, undefined).not
      expect(() => getControl(expectation).fail({ reason: 'foo' })).to.throw('foo')
    })
  })

  type ExpectationType = typeof __ExpectationImplementation
  type loadValidatorsType = typeof loadValidators
  describe('plugin', () => {
    let __ExpectationImplementation: ExpectationType
    let loadValidators: loadValidatorsType
    beforeEach(function (this: Mocha.Context) {
      this.timeout(5_000)
      clearModuleCache()
      ;({ __ExpectationImplementation, loadValidators } = require('../src/Expectation'))
    })

    afterEach(clearModuleCache)

    it('adds new validators', () => {
      function totallyNewValidator(this: any) {
        const ctrl = this.getControl()
        ctrl.assert({ success: false, reason: 'fail', negatedReason: 'fail' })
      }
      loadValidators({ totallyNewValidator })

      const expectation = __ExpectationImplementation.make(undefined, undefined, undefined)

      expect((expectation as any).totallyNewValidator).to.be.instanceOf(Function)
      expect(() => (expectation as any).totallyNewValidator()).to.throw('fail')
    })

    it('clears cache correctly', () => {
      const expectation = __ExpectationImplementation.make(undefined, undefined, undefined)

      expect((expectation as any).totallyNewValidator).to.be.undefined
    })
  })
})
