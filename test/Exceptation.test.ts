import { expect } from 'chai'
import sinon from 'sinon'

import { InternalExpectation, satisfy } from '../src/Expectation'
import { ValidationResult } from '../src/validators/common'

describe('satisfy', () => {
  const successfulMatcherMock = sinon.spy(
    (): ValidationResult => ({ success: true, reason: 'Failure', negatedReason: 'Negated failure' }),
  )
  const unsuccessfulMatcherMock = sinon.spy(
    (): ValidationResult => ({ success: false, reason: 'Failure', negatedReason: 'Negated failure' }),
  )

  describe('when not negated', () => {
    const ctxMock: InternalExpectation<any> = {
      autofix: sinon.spy(),
      actual: undefined,
      isNegated: false,
    }

    it('doesnt throw when validation was successful', () => {
      expect(() => satisfy(successfulMatcherMock).call(ctxMock)).not.to.throw()
    })

    it('throws when validation was unsuccessful', () => {
      expect(() => satisfy(unsuccessfulMatcherMock).call(ctxMock)).to.throw('Failure')
    })
  })

  describe('when negated', () => {
    const ctxMock: InternalExpectation<any> = {
      autofix: sinon.spy(),
      actual: undefined,
      isNegated: true,
    }

    it('throws when validation was successful', () => {
      expect(() => satisfy(successfulMatcherMock).call(ctxMock)).to.throw('Negated failure')
    })

    it('doesnt throw when validation was unsuccessful', () => {
      expect(() => satisfy(unsuccessfulMatcherMock).call(ctxMock)).not.to.throw()
    })
  })
})
