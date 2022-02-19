import debug from 'debug'
import { Callback, Test } from 'uvu'

import { setTestRunnerIntegration } from '../testRunnerCtx'
import { TestInfo, TestRunnerCtx, TestRunnerHook } from './TestRunnerCtx'

type Mutable<T> = { -readonly [P in keyof T]: T[P] }

const d = debug('earljs:uvu')

const beforeHooks: TestRunnerHook[] = []
const afterHooks: TestRunnerHook[] = []
const testRunnerCtx: TestRunnerCtx = {
  testInfo: undefined as unknown as TestInfo,
  beforeTestCase: (fn) => beforeHooks.push(fn),
  afterTestCase: (fn) => afterHooks.push(fn),
}

function main() {
  if (typeof require !== 'function') {
    return
  }

  d('earljs/uvu integration is being registered...')

  setTestRunnerIntegration(testRunnerCtx)

  const uvu = require('uvu') as Mutable<typeof import('uvu')>
  const suite = uvu.suite

  uvu.test = wrapTestSuite(uvu.test)
  uvu.suite = (...args) => wrapTestSuite(suite(...args))
}

function wrapTestSuite<T>(test: Test<T>) {
  const run = wrapTestRun(test, test.run)
  return new Proxy(test, {
    get: (target, prop, receiver) => (prop === 'run' ? run : Reflect.get(target, prop, receiver)),
    apply: (target, thisArg, [name, testCase]: Parameters<Test>) => target.call(thisArg, name, wrapTestCase(testCase)),
  })
}

function wrapTestRun<T>(test: Test<T>, run: Test<T>['run']): Test<T>['run'] {
  return () => {
    beforeHooks.forEach((hook) => test.before.each(hook as Callback))
    afterHooks.forEach((hook) => test.after.each(hook as Callback))
    return run.call(test)
  }
}

function wrapTestCase<T>(fn: Function): Callback<T> {
  // Override the prepareStackTrace function to get access to the unformatted CallSite objects
  // https://v8.dev/docs/stack-trace-api
  const { prepareStackTrace } = Error
  Error.prepareStackTrace = (_err, stack) => stack

  const err: { stack: NodeJS.CallSite[] } = { stack: [] }
  Error.captureStackTrace(err, wrapTestCase)
  const testFilePath = err.stack[1]?.getFileName()

  Error.prepareStackTrace = prepareStackTrace

  if (!testFilePath) {
    throw new Error('Unable to determine test file path')
  }

  return (ctx) => {
    testRunnerCtx.testInfo = {
      suitName: ctx.__suite__ ? [ctx.__suite__] : [],
      testName: ctx.__test__,
      testFilePath,
    }
    return fn(ctx)
  }
}

main()
