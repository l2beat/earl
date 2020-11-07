import _ from 'lodash'
import { EOL } from 'os'

/**
 * Assertion error containing optional info about actual / expected value which can be used by test runners like mocha to pretty print error
 */
export class AssertionError extends Error {
  private readonly actual: any
  private readonly expected: any

  constructor({
    message,
    actual,
    expected,
    extraMessage,
    hint,
  }: {
    message: string
    actual: any
    expected: any
    extraMessage?: string
    hint?: string
  }) {
    const finalMessage = _.compact([
      message,
      extraMessage && 'Extra message: ' + extraMessage,
      hint && 'Hint: ' + hint,
    ]).join(EOL)

    super(finalMessage)
    this.name = 'AssertionError'
    this.actual = actual
    this.expected = expected
  }
}
