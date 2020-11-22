import { expect } from 'chai'
import sinon from 'sinon'

import { Expectation, loadValidators } from '../src/Expectation'
import { clearModuleCache } from './common'

describe('assert', () => {
  const success = { success: true, reason: 'Failure', negatedReason: 'Negated failure' }
  const failure = { success: false, reason: 'Failure', negatedReason: 'Negated failure' }

  describe('when not negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined)

    it('doesnt throw when validation was successful', () => {
      expect(() => expectation['assert'](success)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => expectation['assert'](failure)).to.throw('Failure')
    })
  })

  describe('when negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined, undefined).not

    it('throws when validation was successful', () => {
      expect(() => expectation['assert'](success)).to.throw('Negated failure')
    })

    it('doesnt throw when validation was unsuccessful', () => {
      expect(() => expectation['assert'](failure)).not.to.throw()
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
