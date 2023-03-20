import { expect } from 'chai'
import * as errorStackParser from 'error-stack-parser'

import { Control } from '../Control'
import { expect as earl } from '../index'
import { AssertionError } from './AssertionError'

describe('stack traces for errors', () => {
  it('cleans stack traces for sync errors', () => {
    try {
      earl(1).toEqual(2)
      expect.fail('should throw')
    } catch (e: any) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl did not throw')
      const stackTrace = errorStackParser.parse(e)

      expect(stackTrace[0]?.fileName?.endsWith('stack-traces.test.ts')).to.be
        .true
    }
  })

  it('cleans stack traces for non-native async errors', async () => {
    try {
      earl(await (async () => 1)()).toEqual(2)
      expect.fail('should throw')
    } catch (e: any) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl did not throw')
      const stackTrace = errorStackParser.parse(e)

      expect(stackTrace[0]?.fileName?.endsWith('stack-traces.test.ts')).to.be
        .true
    }
  })

  it('cleans stack traces for native async errors', async () => {
    try {
      await earl(Promise.resolve(1)).async.toEqual(2)
      expect.fail('should throw')
    } catch (e: any) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl did not throw')
      const stackTrace = errorStackParser.parse(e)

      expect(stackTrace[0]?.fileName?.endsWith('stack-traces.test.ts')).to.be
        .true
    }
  })

  it('has a correct file name', () => {
    // we need the nesting to simulate the stack trace
    function nestedValidator() {
      function nestedGetControl() {
        return new Control({})
      }
      return nestedGetControl()
    }
    const control = nestedValidator()
    expect(control.file).to.equal(__filename)
  })
})
