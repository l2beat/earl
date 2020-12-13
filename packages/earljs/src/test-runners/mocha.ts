import debug from 'debug'
import { assert } from 'ts-essentials'

import { setTestRunnerIntegration } from '../testRunnerCtx'
import { TestInfo, TestRunnerCtx, TestRunnerHook } from './TestRunnerCtx'

const d = debug('earljs:mocha')

exports.mochaGlobalSetup = async function () {
  d('Integrating earl with mocha...')

  setTestRunnerIntegration(new MochaCtx())
}

export class MochaCtx implements TestRunnerCtx {
  testInfo!: TestInfo

  constructor() {
    const self = this

    d('Installing beforeEach hook to get testInfo before each test')
    globalThis.beforeEach(function () {
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
    globalThis.beforeEach(fn)
  }

  beforeTestCase(fn: TestRunnerHook) {
    globalThis.afterEach(fn)
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
