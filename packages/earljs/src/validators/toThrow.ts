import { Control } from '../Control'
import { registerValidator } from '../expect'
import { format, formatCompact } from '../format'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toThrow(this: Validators<() => any>, message?: string | RegExp): void
    toThrow(
      this: Validators<() => any>,
      errorClass: new (...args: any[]) => Error,
      message?: string | RegExp,
    ): void
  }
}

registerValidator('toThrow', toThrow)

export function toThrow(
  control: Control<unknown>,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
): void {
  if (typeof control.actual !== 'function') {
    const actualInline = formatCompact(control.actual)
    return control.fail({ reason: `Expected ${actualInline} to be a function` })
  }

  let thrownError: unknown
  let didThrow = false
  try {
    control.actual()
  } catch (e) {
    didThrow = true
    thrownError = e
  }

  if (!didThrow) {
    return control.assert({
      success: false,
      reason: "function call didn't throw an error",
      negatedReason: '',
    })
  }

  const expectedClass =
    typeof errorClassOrMessage === 'function' ? errorClassOrMessage : undefined
  const expectedMessage =
    typeof errorClassOrMessage === 'function' ? message : errorClassOrMessage

  if (expectedClass === undefined && expectedMessage === undefined) {
    return control.assert({
      success: true,
      reason: '',
      negatedReason: 'function call threw an error',
    })
  }

  const classMatches = isMatchingClass(thrownError, expectedClass)
  const messageMatches = isMatchingMessage(thrownError, expectedMessage)

  if (expectedClass === undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    return control.assert({
      success: messageMatches,
      reason: `function call threw, but the message didn't match ${messageInline}`,
      negatedReason: `function call threw and the message matched ${messageInline}`,
      expected: formatExpected(thrownError, expectedClass, expectedMessage),
      actual: format(thrownError, null),
    })
  }

  if (expectedClass !== undefined && expectedMessage === undefined) {
    const className = expectedClass.name
    return control.assert({
      success: classMatches,
      reason: `function call threw, but the error wasn't an instance of ${className}`,
      negatedReason: `function call threw and the error was an instance of ${className}`,
      expected: formatExpected(thrownError, expectedClass, expectedMessage),
      actual: format(thrownError, null),
    })
  }

  if (expectedClass !== undefined && expectedMessage !== undefined) {
    const messageInline = formatCompact(expectedMessage)
    const className = expectedClass.name

    return control.assert({
      success: classMatches && messageMatches,
      reason: `function call threw, but the error wasn't an instance of ${className} with message ${messageInline}`,
      negatedReason: `function call threw and the error was an instance of ${className} with message ${messageInline}`,
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
  return (
    typeof thrownError === 'object' &&
    thrownError != null &&
    Reflect.get(thrownError, 'message')
  )
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
