import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toThrow(
      this: Validators<R extends Promise<void> ? any : () => any, R>,
      errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
      message?: string | RegExp,
    ): R
  }
}

registerValidator('toThrow', toThrow)

export function toThrow(
  control: Control,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
): void | Promise<void> {
  if (control.isAsync && control.receivedPromise) {
    return continuePromise(control, errorClassOrMessage, message)
  }

  if (typeof control.actual !== 'function') {
    const actualInline = formatCompact(control.actual)
    return control.fail({ reason: `Expected ${actualInline} to be a function` })
  }

  if (control.isAsync) {
    return continueAsyncFunction(
      control,
      control.actual,
      errorClassOrMessage,
      message,
    )
  }
  continueSyncFunction(control, control.actual, errorClassOrMessage, message)
}

function continuePromise(
  control: Control,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  if (control.isAsyncSuccess) {
    return control.assert({
      success: false,
      reason:
        'The promise was not rejected, but it was expected to be rejected.',
      negatedReason: '',
    })
  }

  processError(
    control,
    control.asyncError,
    'The promise was rejected with an error',
    errorClassOrMessage,
    message,
  )
}

async function continueAsyncFunction(
  control: Control,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  let thrownError: unknown
  let didThrow = false
  try {
    await fn()
  } catch (e) {
    didThrow = true
    thrownError = e
  }

  if (!didThrow) {
    return control.assert({
      success: false,
      reason:
        'The async function call did not throw an error, but it was expected to.',
      negatedReason: '',
    })
  }

  processError(
    control,
    thrownError,
    'The async function call threw an error',
    errorClassOrMessage,
    message,
  )
}

function continueSyncFunction(
  control: Control,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  let thrownError: unknown
  let didThrow = false
  try {
    fn()
  } catch (e) {
    didThrow = true
    thrownError = e
  }

  if (!didThrow) {
    return control.assert({
      success: false,
      reason:
        'The function call did not throw an error, but it was expected to.',
      negatedReason: '',
    })
  }

  processError(
    control,
    thrownError,
    'The function call threw an error',
    errorClassOrMessage,
    message,
  )
}

function processError(
  control: Control,
  thrownError: unknown,
  sentenceStart: string,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  const expectedClass =
    typeof errorClassOrMessage === 'function' ? errorClassOrMessage : undefined
  const expectedMessage =
    typeof errorClassOrMessage === 'function' ? message : errorClassOrMessage

  if (expectedClass === undefined && expectedMessage === undefined) {
    return control.assert({
      success: true,
      reason: '',
      negatedReason: `${sentenceStart}, but it was expected not to.`,
    })
  }

  const classMatches = isMatchingClass(thrownError, expectedClass)
  const messageMatches = isMatchingMessage(thrownError, expectedMessage)

  if (expectedClass === undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    return control.assert({
      success: messageMatches,
      reason: `${sentenceStart} and the message did not match ${messageInline}, but it was expected to.`,
      negatedReason: `${sentenceStart} and the message matched ${messageInline}, but it was expected not to.`,
      expected: format(expectedMessage, null),
      actual: format(getMessageProperty(thrownError), null),
    })
  }

  if (expectedClass !== undefined && expectedMessage === undefined) {
    const className = expectedClass.name
    return control.assert({
      success: classMatches,
      reason: `${sentenceStart} and it was not an instance of ${className}, but it was expected to be.`,
      negatedReason: `${sentenceStart} and it was an instance of ${className}, but it was expected not to be.`,
      expected: className,
      actual: getConstructorName(thrownError),
    })
  }

  if (expectedClass !== undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    const className = expectedClass.name

    return control.assert({
      success: classMatches && messageMatches,
      reason: `${sentenceStart} and it was not an instance of ${className} with message ${messageInline}, but it was expected to be.`,
      negatedReason: `${sentenceStart} and it was an instance of ${className} with message ${messageInline}, but it was expected not to be.`,
      expected: formatExpected(thrownError, expectedClass, expectedMessage),
      actual: format(thrownError, null),
    })
  }
}

function isMatchingClass(
  thrownError: unknown,
  expected?: new (...args: any[]) => Error,
): boolean {
  return !expected || thrownError instanceof expected
}

function isMatchingMessage(
  thrownError: unknown,
  expected?: string | RegExp,
): boolean {
  if (typeof expected === 'string') {
    const thrownMessage = getMessageProperty(thrownError)
    return typeof thrownMessage === 'string' && thrownMessage.includes(expected)
  } else if (expected instanceof RegExp) {
    const thrownMessage = getMessageProperty(thrownError)
    return typeof thrownMessage === 'string' && expected.test(thrownMessage)
  } else {
    return true
  }
}

function formatExpected(
  thrownError: unknown,
  expectedClass?: new (...args: any[]) => Error,
  expectedMessage?: string | RegExp,
) {
  const thrownClassName = getConstructorName(thrownError)
  const thrownName = getNameProperty(thrownError)

  const className = expectedClass ? expectedClass.name : thrownClassName

  const object: { message?: string | RegExp; name?: string } = {}
  if (expectedMessage !== undefined) {
    object.message = expectedMessage
  }
  if (thrownName !== undefined) {
    object.name = thrownName
  }

  return `${className ? className + ' ' : ''}${format(object, null)}`
}

function getMessageProperty(thrownError: unknown): unknown {
  return typeof thrownError === 'object' && thrownError != null
    ? Reflect.get(thrownError, 'message')
    : undefined
}

function getNameProperty(thrownError: unknown): string | undefined {
  const name =
    typeof thrownError === 'object' &&
    thrownError != null &&
    Reflect.get(thrownError, 'name')
  if (typeof name === 'string') {
    return name
  }
}

function getConstructorName(thrownError: unknown): string | undefined {
  return typeof thrownError === 'object' &&
    thrownError != null &&
    thrownError.constructor !== Object
    ? thrownError.constructor.name
    : undefined
}
