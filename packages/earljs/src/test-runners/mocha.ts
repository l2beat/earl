import debug from 'debug'
import mocha, { Context, Runner, Suite } from 'mocha'
import { assert } from 'ts-essentials'

import { setTestRunnerIntegration } from '../testRunnerCtx'
import { TestInfo, TestRunnerCtx, TestRunnerHook } from './TestRunnerCtx'

const d = debug('earljs:mocha')

/**
 * Needed in Mocha --watch mode. Mocha doesn't export hooks before mocha.ui() is called
 */
function main() {
  for (const module of findMochaInstances()) {
    if (!module || (module as any).__earljs_integrated) {
      continue
    }
    ;(module as any).__earljs_integrated = true

    d('Monkey-patching Mocha.prototype.ui')
    const { ui } = module.prototype
    module.prototype.ui = function (...args) {
      setTestRunnerIntegration(new MochaCtx(this.suite))
      return ui.apply(this, args)
    }
  }
}

/**
 * In mocha run mode, we use the suite with hooks already assigned to Mocha's exports.
 */
exports.mochaGlobalSetup = function (this: Runner) {
  d('Integrating earl with mocha...')

  if ((mocha as Partial<MochaHooks>).beforeEach) {
    setTestRunnerIntegration(new MochaCtx(mocha))
  }
}

function findMochaInstances(): (typeof mocha | undefined)[] {
  const mochaFromWindow = (globalThis as any).window?.Mocha
  if (mochaFromWindow) {
    return [mochaFromWindow]
  }

  const req = require as typeof require | undefined
  if (typeof req === 'function') {
    // require can be undefined in Node ESM and browser contexts
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const cache = req.cache || {}
    return Object.keys(cache)
      .filter(function (child) {
        var val = cache[child]?.exports
        return typeof val === 'function' && val.name === 'Mocha'
      })
      .map(function (child) {
        return cache[child]?.exports
      })
  }

  return []
}

export class MochaCtx implements TestRunnerCtx {
  testInfo!: TestInfo

  constructor(private readonly _hooks: MochaHooks) {
    const self = this

    d('Installing beforeEach hook to get testInfo before each test')
    _hooks.beforeEach(function () {
      assert(this.currentTest, "Current test not set by mocha. This shouldn't happen.")
      assert(this.currentTest.file, "Current test file path not set by mocha. This shouldn't happen.")
      assert(this.currentTest.parent, "Current test has no parent set by mocha. This shouldn't happen.")

      self.testInfo = {
        suitName: makeSuiteName(this.currentTest.parent),
        testName: this.currentTest.title,
        testFilePath: this.currentTest.file,
      }
    })
  }

  afterTestCase(fn: TestRunnerHook) {
    this._hooks.afterEach(fn)
  }

  beforeTestCase(fn: TestRunnerHook) {
    this._hooks.beforeEach(fn)
  }
}

interface MochaHooks {
  beforeEach(fn: (this: Context) => void): void
  afterEach(fn: (this: Context) => void): void
}

function makeSuiteName(testCtx: Suite): string[] {
  if (testCtx.parent) {
    return [...makeSuiteName(testCtx.parent), testCtx.title]
  }
  if (testCtx.title) {
    return [testCtx.title]
  }
  return []
}

main()
