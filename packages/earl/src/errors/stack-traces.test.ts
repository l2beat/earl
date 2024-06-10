import { fileURLToPath } from 'node:url'
import { expect } from 'chai'
import ErrorStackParser from 'error-stack-parser'

import { Control } from '../Control.js'
import { expect as earl } from '../index.js'
import { AssertionError } from './AssertionError.js'

describe('stack traces for errors', () => {
  it('cleans stack traces for sync errors', () => {
    try {
      earl(1).toEqual(2)
      expect.fail('should throw')
    } catch (e) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl did not throw')
      const stackTrace = ErrorStackParser.parse(e as Error)

      expect(stackTrace[0]?.fileName?.endsWith('stack-traces.test.ts')).to.be
        .true
    }
  })

  it('cleans stack traces for non-native async errors', async () => {
    try {
      earl(await (async () => 1)()).toEqual(2)
      expect.fail('should throw')
    } catch (e) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl did not throw')
      const stackTrace = ErrorStackParser.parse(e as Error)

      expect(stackTrace[0]?.fileName?.endsWith('stack-traces.test.ts')).to.be
        .true
    }
  })

  it('has a correct file name', () => {
    // we need the nesting to simulate the stack trace
    function nestedValidator() {
      function nestedGetControl() {
        return new Control({ name: 'foo' })
      }
      return nestedGetControl()
    }
    const control = nestedValidator()
    expect(control.file).to.equal(fileURLToPath(import.meta.url))
  })
})
