import { EOL } from 'os'

/**
 * Assertion error containing optional info about actual / expected value which
 * can be used by test runners like Mocha to pretty print.
 */
export class AssertionError extends Error {
  public actual: any
  public expected: any

  update(options: { message: string; actual: any; expected: any; extraMessage?: string; hint?: string }) {
    let message = options.message
    if (options.extraMessage) {
      message += EOL + 'Extra message: ' + options.extraMessage
    }
    if (options.hint) {
      message += EOL + 'Hint: ' + options.hint
    }
    this.message = message
    this.actual = options.actual
    this.expected = options.expected
    this.stack = removeInternalEntries(this.stack)
  }

  constructor() {
    super('')
    this.name = 'AssertionError'
  }
}

const STACK_ENTRIES_TO_REMOVE = 3
// at new Control (src/Control.ts)
// at __ExpectationImplementation.getControl (src/Expectation.ts)
// at __ExpectationImplementation.<validator> (src/Expectation.ts)

function removeInternalEntries(stack: string | undefined) {
  const lines = stack?.split('\n') ?? []
  let stackEntryCount = 0
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^\s+at\s/.test(lines[i])) {
      stackEntryCount++
    } else {
      break
    }
  }
  if (stackEntryCount <= STACK_ENTRIES_TO_REMOVE) {
    return stack
  }
  lines.splice(lines.length - stackEntryCount, STACK_ENTRIES_TO_REMOVE)
  return lines.join('\n')
}
