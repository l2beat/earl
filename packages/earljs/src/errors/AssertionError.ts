import ErrorStackParser from 'error-stack-parser'
import { EOL } from 'os'

interface AssertionErrorOptions {
  message: string
  stack: string
  actual?: string
  expected?: string
  extraMessage?: string
}

/**
 * Assertion error containing optional info about actual / expected value which
 * can be used by test runners like Mocha to pretty print.
 */
export class AssertionError extends Error {
  public actual?: string
  public expected?: string

  constructor(options: AssertionErrorOptions) {
    let message = options.message
    if (options.extraMessage) {
      message += EOL + 'Extra message: ' + options.extraMessage
    }
    super(message)
    this.name = 'AssertionError'
    this.actual = options.actual
    this.expected = options.expected
    this.stack = `${this.name}: ${this.message}\n${options.stack}`
  }

  static getLocation() {
    const error = new Error('message')
    const stack = this.getCleanStack(error)
    return {
      file: ErrorStackParser.parse({ stack } as Error)[0].fileName,
      stack,
    }
  }

  private static getCleanStack(error: Error) {
    // .<validator>, .getControl, new Control, .getCleanStack
    const entriesToRemove = 4

    const stack = error.stack
    if (stack && stack.startsWith('Error: message\n')) {
      return stack
        .split('\n')
        .slice(entriesToRemove + 1)
        .join('\n')
    }
    return stack ?? ''
  }
}
