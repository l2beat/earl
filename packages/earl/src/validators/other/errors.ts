import { Control } from '../../Control.js'
import { format, formatCompact } from '../../format/index.js'

export function captureError(fn: () => unknown) {
  let error: unknown
  let result: unknown
  let didThrow = false
  try {
    result = fn()
  } catch (e) {
    didThrow = true
    error = e
  }
  return { didThrow, error, result }
}

export async function captureAsyncError(fn: () => Promise<void>) {
  let error: unknown
  let result: unknown
  let didThrow = false
  try {
    result = await fn()
  } catch (e) {
    didThrow = true
    error = e
  }
  return { didThrow, error, result }
}

export function processError(
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
      negatedReason: `${sentenceStart} an error, but it was expected not to.`,
    })
  }

  const classMatches = isMatchingClass(thrownError, expectedClass)
  const messageMatches = isMatchingMessage(thrownError, expectedMessage)

  if (expectedClass === undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    return control.assert({
      success: messageMatches,
      reason: `${sentenceStart} a message that did not match ${messageInline}, but it was expected to.`,
      negatedReason: `${sentenceStart} a message matching ${messageInline}, but it was expected not to.`,
      actual: getMessageProperty(thrownError),
      expected: expectedMessage,
    })
  }

  if (expectedClass !== undefined && expectedMessage === undefined) {
    const className = expectedClass.name
    return control.assert({
      success: classMatches,
      reason: `${sentenceStart} an error that was not an instance of ${className}, but it was expected to be.`,
      negatedReason: `${sentenceStart} an instance of ${className}, but it was expected not to.`,
      actual: getConstructorName(thrownError),
      expected: className,
    })
  }

  if (expectedClass !== undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    const className = expectedClass.name

    return control.assert({
      success: classMatches && messageMatches,
      reason: `${sentenceStart} an error that was not an instance of ${className} with the message ${messageInline}, but it was expected to be.`,
      negatedReason: `${sentenceStart} an instance of ${className} with the message ${messageInline}, but it was expected not to.`,
      actual: format(thrownError, null),
      expected: formatExpected(thrownError, expectedClass, expectedMessage),
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
