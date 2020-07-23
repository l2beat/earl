import sinon from 'sinon'

import { expect as expectEarl } from '../src'
import { Expectation } from '../src/Expectation'

describe('assert', () => {
  const success = { success: true, reason: 'Failure', negatedReason: 'Negated failure' }
  const failure = { success: false, reason: 'Failure', negatedReason: 'Negated failure' }

  describe('when not negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined)

    it('doesnt throw when validation was successful', () => {
      expectEarl(() => expectation['assert'](success)).not.toThrow()
    })

    it('throws when validation was unsuccessful', () => {
      expectEarl(() => expectation['assert'](failure)).toThrow(expectEarl.error('Failure'))
    })
  })

  describe('when negated', () => {
    const expectation = new Expectation(sinon.spy(), undefined).not

    it('throws when validation was successful', () => {
      expectEarl(() => expectation['assert'](success)).toThrow(expectEarl.error('Negated failure'))
    })

    it('doesnt throw when validation was unsuccessful', () => {
      expectEarl(() => expectation['assert'](failure)).not.toThrow()
    })
  })
})
