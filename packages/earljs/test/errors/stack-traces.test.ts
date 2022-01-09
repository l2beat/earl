import { expect } from 'chai'
import * as errorStackParser from 'error-stack-parser'

import { AssertionError } from '../../src/errors'
import { expect as earl } from '../../src/expect'

describe('stack traces for errors', () => {
  it('cleans stack traces for sync errors', () => {
    try {
      earl(1).toEqual(2)
      expect.fail('should throw')
    } catch (e: any) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl didnt throw')
      const stackTrace = errorStackParser.parse(e)

      expect(stackTrace[0].fileName?.endsWith('stack-traces.test.ts')).to.be.true
    }
  })

  it('cleans stack traces for async errors', async () => {
    try {
      earl(await (async () => 1)()).toEqual(2)
      expect.fail('should throw')
    } catch (e: any) {
      expect(e).to.be.instanceOf(AssertionError, 'Earl didnt throw')
      const stackTrace = errorStackParser.parse(e)

      expect(stackTrace[0].fileName?.endsWith('stack-traces.test.ts')).to.be.true
    }
  })
})
