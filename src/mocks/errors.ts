export class MockNotConfiguredError extends Error {
  constructor() {
    super('Mock is not configured')
  }
}
