import { fileURLToPath } from 'node:url'
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

  static getLocation(name: string) {
    const error = new Error('message')
    let cleaned: string | undefined
    let parsed: ErrorStackParser.StackFrame[] | undefined
    return {
      file: () => {
        cleaned = cleaned ?? getCleanStack(error)
        parsed = parsed ?? ErrorStackParser.parse({ stack: cleaned } as Error)
        const fileName = parsed[0]?.fileName
        if (fileName?.startsWith('file://')) {
          return fileURLToPath(fileName)
        }
        return fileName
      },
      stack: () => {
        cleaned = cleaned ?? getCleanStack(error)
        parsed = parsed ?? ErrorStackParser.parse({ stack: cleaned } as Error)
        return formatStack(name, parsed)
      },
    }
  }
}

function getCleanStack(error: Error) {
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

function formatStack(name: string, stack: ErrorStackParser.StackFrame[]) {
  return stack
    .map((frame, i) => {
      let file = frame.fileName
      if (file !== undefined && frame.lineNumber !== undefined) {
        file += `:${frame.lineNumber}`
        if (frame.columnNumber !== undefined) {
          file += `:${frame.columnNumber}`
        }
      }

      if (i === 0) {
        return file === undefined
          ? `    at ${name}`
          : `    at ${name} (${file})`
      }
      return frame.source
    })
    .join('\n')
}
