import debug from 'debug'
import { Callback, Test } from 'uvu'

import { setTestRunnerIntegration } from '../testRunnerCtx'
import { TestRunnerCtx } from './TestRunnerCtx'

const d = debug('earljs:uvu')

function main() {
  if (typeof require !== 'function') {
    return
  }

  d('earljs/uvu integration is being registered...')

  const uvu: typeof import('uvu') = require('uvu')
  patchTest(uvu.test)

  const suite = uvu.suite
  uvu.suite = (...args) => {
    const test = suite(...args)
    patchTest(test)
    return test
  }
}

function patchTest(test: Test) {
  const run = test.run.bind(test)
  test.run = () => {
    const testRunnerCtx: TestRunnerCtx = {
      testInfo: {
        suitName: [],
        testName: '',
        testFilePath: parseFilePathFromStackTrace(test.run),
      },
      beforeTestCase: (fn) => test.before.each(fn as Callback),
      afterTestCase: (fn) => test.after.each(fn as Callback),
    }

    test.before(() => setTestRunnerIntegration(testRunnerCtx))

    test.before.each((ctx) => {
      testRunnerCtx.testInfo.suitName = ctx.__suite__ ? [ctx.__suite__] : []
      testRunnerCtx.testInfo.testName = ctx.__test__
    })

    return run()
  }
}

function parseFilePathFromStackTrace(ctor: Function) {
  // Override the prepareStackTrace function to get access to the unformatted
  // CallSite objects
  // https://v8.dev/docs/stack-trace-api
  const { prepareStackTrace } = Error
  Error.prepareStackTrace = (_err, stack) => stack

  const err: { stack: NodeJS.CallSite[] } = { stack: [] }
  Error.captureStackTrace(err, ctor)
  const filename = err.stack[0]?.getFileName()

  Error.prepareStackTrace = prepareStackTrace

  if (!filename) {
    throw new Error('Unable to determine test file path')
  }

  return filename
}

main()
