import { TestRunnerCtx } from './test-runners/TestRunnerCtx'

let testRunnerCtx: TestRunnerCtx | undefined
export function setTestRunnerIntegration(_testRunnerCtx: TestRunnerCtx) {
  testRunnerCtx = _testRunnerCtx
}

export function getTestRunnerIntegration() {
  return testRunnerCtx
}
