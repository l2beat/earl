import StackTracey from 'stacktracey'

interface CallTrace {
  file: string
  line: number // from 0
  column: number // from 0
}

export type GetCallTraceType = typeof getCallTrace

/**
 * Get call trace on a given position on a current stack
 * @todo: probably it should not rely on position index but find first file in stack trace that's outside of the current package
 */
export function getCallTrace(position: number): CallTrace {
  const stack = new StackTracey()

  const s = stack[position]
  const filePath = s.file
  const line = s.line - 1
  const column = s.column - 1

  return {
    file: filePath,
    line,
    column,
  }
}
