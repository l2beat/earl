export interface MochaTestContext {
  test?: {
    file?: string
    fullTitle(): string
  }
}
