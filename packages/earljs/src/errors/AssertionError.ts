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

  static getLocation() {
    const error = new Error('message')
    const stack = this.getCleanStack(error)
    const file = ErrorStackParser.parse({ stack } as Error)[0]?.fileName
    return { file, stack }
  }

  private static getCleanStack(error: Error) {
    const lines = error.stack?.split('\n') ?? []

    if (lines[0]?.startsWith('Error: message')) {
      return lines.slice(5).join('\n')
    }

    if (lines[0]?.includes('AssertionError') && lines[2]?.includes('^')) {
      // in esbuild-register context is added to the stack trace
      return lines.slice(9).join('\n')
    }

    return error.stack ?? ''
  }
}
