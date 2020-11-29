import { AsyncOrSync } from 'ts-essentials'

export type TestRunnerHook = () => AsyncOrSync<void>

export interface TestRunnerCtx {
  testInfo: TestInfo
  beforeTestCase(fn: TestRunnerHook): void
  afterTestCase(fn: TestRunnerHook): void
}

export interface TestInfo {
  suitName: string[]
  testName: string
  testFilePath: string
}
