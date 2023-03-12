export interface TestContext extends MochaTestContext, UvuTestContext {}

export interface MochaTestContext {
  test?: {
    file?: string
    fullTitle(): string
  }
}

export interface UvuTestContext {
  __test__?: string
  __suite__?: string
}
