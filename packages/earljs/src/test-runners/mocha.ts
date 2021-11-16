import debug from 'debug'
import { assert } from 'ts-essentials'
import mocha from 'mocha'

import { TestInfo, TestRunnerCtx, TestRunnerHook } from './TestRunnerCtx'
import { setTestRunnerIntegration } from '../testRunnerCtx'

const d = debug('earljs:mocha')

export class MochaCtx implements TestRunnerCtx {
  testInfo!: TestInfo

  constructor() {
    const self = this

    d('Installing beforeEach hook to get testInfo before each test')
    mocha.beforeEach(function () {
      assert(this.currentTest, "Current test not set by mocha. This shouldn't happen.")
      assert(this.currentTest.file, "Current test file path not set by mocha. This shouldn't happen.")
      assert(this.currentTest.parent, "Current test has no parent set by mocha. This shouldn't happen.")

      self.testInfo = {
        suitName: makeSuitName(this.currentTest.parent),
        testName: this.currentTest.title,
        testFilePath: this.currentTest.file,
      }
    })
  }

  afterTestCase(fn: TestRunnerHook) {
    mocha.beforeEach(fn)
  }

  beforeTestCase(fn: TestRunnerHook) {
    mocha.afterEach(fn)
  }
}

function makeSuitName(testCtx: Mocha.Suite): string[] {
  if (testCtx.parent) {
    return [...makeSuitName(testCtx.parent), testCtx.title]
  }
  if (testCtx.title) {
    return [testCtx.title]
  }
  return []
}

d('Integrating earl with mocha...')

setTestRunnerIntegration(new MochaCtx())
