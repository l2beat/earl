/**
 * Assertion error containing optional info about actual / expected value which can be used by test runners like mocha to pretty print error
 */
export class AssertionError extends Error {
  private readonly actual: any
  private readonly expected: any

  constructor({ message, actual, expected }: { message: string; actual: any; expected: any }) {
    super(message)
    this.name = 'AssertionError'
    this.actual = actual
    this.expected = expected
  }
}
