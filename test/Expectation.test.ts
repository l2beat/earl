import { expect } from 'chai'
import sinon from 'sinon'

import { Expectation } from '../src/Expectation'

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
})
