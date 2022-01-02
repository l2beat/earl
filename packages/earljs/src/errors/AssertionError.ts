import { EOL } from 'os'

/**
 * Assertion error containing optional info about actual / expected value which
 * can be used by test runners like Mocha to pretty print.
 */
export class AssertionError extends Error {
  readonly actual: any
  readonly expected: any

  constructor({
    message,
    actual,
    expected,
    extraMessage,
  }: {
    message: string
    actual: any
    expected: any
    extraMessage?: string
  }) {
    let finalMessage = message
    if (extraMessage) {
      finalMessage += `${EOL}Extra message: ${extraMessage}`
    }

    super(finalMessage)
    this.name = 'AssertionError'
    this.actual = actual
    this.expected = expected
  }
}
