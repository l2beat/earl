import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { captureAsyncError, processError } from './errors.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that an async function or a promise was rejected.
     *
     * The result of this validator is a promise, so you can need to use it with
     * `await`.
     *
     * To also assert the error message, use `toBeRejectedWith`.
     *
     * @example
     * ```ts
     * await expect(async () => {
     *   throw new Error('foo')
     * }).toBeRejected()
     *
     * await expect(Promise.reject(new Error('foo'))).toBeRejected()
     * ```
     */
    toBeRejected(
      this: Validators<(() => Promise<any>) | Promise<any>>,
    ): Promise<void>

    /**
     * Asserts that an async function or a promise was rejected with a given
     * message and/or error class.
     *
     * The result of this validator is a promise, so you can need to use it with
     * `await`.
     *
     * @param message - A substring of the error message or a regex matching the
     *   message.
     *
     * @example
     * ```ts
     * // checking the error message with a substring
     * await expect(async () => {
     *   throw new Error('no pancakes found')
     * }).toBeRejectedWith('pancakes')
     *
     * // checking the error message with a regex
     * await expect(Promise.reject(new Error('12345'))).toBeRejectedWith(
     *   /^\d+$/,
     * )
     *
     * // checking the error class
     * await expect(async () => {
     *   throw new TypeError('magic')
     * }).toBeRejectedWith(TypeError)
     *
     * // checking the error class and message
     * await expect(async () => 1n / 0n).toBeRejectedWith(
     *   RangeError,
     *   'Division by zero',
     * )
     * ```
     */
    toBeRejectedWith(
      this: Validators<(() => Promise<any>) | Promise<any>>,
      message: string | RegExp,
    ): Promise<void>

    /**
     * Asserts that an async function or a promise was rejected with a given
     * message and/or error class.
     *
     * The result of this validator is a promise, so you can need to use it with
     * `await`.
     *
     * @param errorClass - The error class to check.
     * @param message - A substring of the error message or a regex matching the
     *   message.
     *
     * @example
     * ```ts
     * // checking the error message with a substring
     * await expect(async () => {
     *   throw new Error('no pancakes found')
     * }).toBeRejectedWith('pancakes')
     *
     * // checking the error message with a regex
     * await expect(Promise.reject(new Error('12345'))).toBeRejectedWith(
     *   /^\d+$/,
     * )
     *
     * // checking the error class
     * await expect(async () => {
     *   throw new TypeError('magic')
     * }).toBeRejectedWith(TypeError)
     *
     * // checking the error class and message
     * await expect(async () => 1n / 0n).toBeRejectedWith(
     *   RangeError,
     *   'Division by zero',
     * )
     * ```
     */
    toBeRejectedWith(
      this: Validators<(() => Promise<any>) | Promise<any>>,
      errorClass: new (...args: any[]) => Error,
      message?: string | RegExp,
    ): Promise<void>
  }
}

registerValidator('toBeRejected', (control) => toBeRejectedWith(control))
registerValidator('toBeRejectedWith', toBeRejectedWith)

export async function toBeRejectedWith(
  control: Control,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
): Promise<void> {
  if (typeof control.actual === 'function') {
    return handleAsyncFunction(
      control,
      control.actual,
      errorClassOrMessage,
      message,
    )
  }

  if (control.actual instanceof Promise) {
    return handlePromise(control, control.actual, errorClassOrMessage, message)
  }

  const actualInline = formatCompact(control.actual)
  return control.fail({
    reason: `The value ${actualInline} is neither a function nor a promise, but it was expected to be a function or a promise.`,
  })
}

async function handleAsyncFunction(
  control: Control,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  const { didThrow, error } = await captureAsyncError(() => fn())

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
    error,
    'The async function call threw',
    errorClassOrMessage,
    message,
  )
}

async function handlePromise(
  control: Control,
  promise: Promise<any>,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
) {
  const { didThrow, error } = await captureAsyncError(() => promise)

  if (!didThrow) {
    return control.assert({
      success: false,
      reason:
        'The promise was not rejected, but it was expected to be rejected.',
      negatedReason: '',
    })
  }

  processError(
    control,
    error,
    'The promise was rejected with',
    errorClassOrMessage,
    message,
  )
}
