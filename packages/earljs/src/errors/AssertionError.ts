import ErrorStackParser from 'error-stack-parser'

interface AssertionErrorOptions {
  message: string
  stack: string
  actual?: string
  expected?: string
}

/**
 * Assertion error containing optional info about actual / expected value which
 * can be used by test runners like Mocha to pretty print.
 */
export class AssertionError extends Error {
  public actual?: string
  public expected?: string

  constructor(options: AssertionErrorOptions) {
    const message = options.message
    super(message)
    this.name = 'AssertionError'
    this.actual = options.actual
    this.expected = options.expected
    this.stack = `${this.message}\n${options.stack}`
  }

  static getLocation(depth: number) {
    const error = new Error('message')
    const stack = this.getCleanStack(error, depth)
    const file = ErrorStackParser.parse({ stack } as Error)[0]?.fileName
    return { file, stack }
  }

  private static getCleanStack(error: Error, depth: number) {
    if (error.stack?.startsWith('Error: message\n')) {
      return error.stack
        .split('\n')
        .slice(depth + 1)
        .join('\n')
    }
    return error.stack ?? ''
  }
}
