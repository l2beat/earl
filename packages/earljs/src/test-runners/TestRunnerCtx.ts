import { AsyncOrSync } from 'ts-essentials'

export type TestRunnerHook = () => AsyncOrSync<void>

export interface TestRunnerCtx {
  testInfo: TestInfo
  beforeTestCase(fn: Function): void
  afterTestCase(fn: Function): void
}

export interface TestInfo {
  suitName: string[]
  testName: string
  testFilePath: string
}
