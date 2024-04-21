import type { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { captureError, processError } from './errors.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that a function throws a given message and/or error class when
     * called.
     *
     * This validator does not support async functions. Use `toBeRejected` and
     * `toBeRejectedWith` instead.
     *
     * @param message - A substring of the error message or a regex matching the
     *   message.
     *
     * @example
     * ```ts
     * // just checking that the function throws
     * expect(() => {
     *   throw new Error('foo')
     * }).toThrow()
     *
     * // checking the error message with a substring
     * expect(() => {
     *   throw new Error('no pancakes found')
     * }).toThrow('pancakes')
     *
     * // checking the error message with a regex
     * expect(() => {
     *   throw new Error('12345')
     * }).toThrow(/^\d+$/)
     *
     * // checking the error class
     * expect(() => {
     *   throw new TypeError('magic')
     * }).toThrow(TypeError)
     *
     * // checking the error class and message
     * expect(() => 1n / 0n).toThrow(RangeError, 'Division by zero')
     * ```
     */
    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    toThrow(this: Validators<() => any>, message?: string | RegExp): void

    /**
     * Asserts that a function throws a given message and/or error class when
     * called.
     *
     * This validator does not support async functions. Use `toBeRejected` and
     * `toBeRejectedWith` instead.
     *
     * @param errorClass - The error class to check.
     * @param message - A substring of the error message or a regex matching the
     *   message.
     *
     * @example
     * ```ts
     * // checking the error message with a substring
     * expect(() => {
     *   throw new Error('no pancakes found')
     * }).toThrow('pancakes')
     *
     * // checking the error message with a regex
     * expect(() => {
     *   throw new Error('12345')
     * }).toThrow(/^\d+$/)
     *
     * // checking the error class
     * expect(() => {
     *   throw new TypeError('magic')
     * }).toThrow(TypeError)
     *
     * // checking the error class and message
     * expect(() => 1n / 0n).toThrow(RangeError, 'Division by zero')
     * ```
     */
    toThrow(
      // biome-ignore lint/suspicious/noExplicitAny: any is required here
      this: Validators<() => any>,
      // biome-ignore lint/suspicious/noExplicitAny: any is required here
      errorClass: new (...args: any[]) => Error,
      message?: string | RegExp,
    ): void
  }
}

registerValidator('toThrow', toThrow)

export function toThrow(
  control: Control,
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
): void {
  if (typeof control.actual !== 'function') {
    const actualInline = formatCompact(control.actual)
    control.fail({
      reason: `The value ${actualInline} is not a function, but it was expected to be a function.`,
    })
    return
  }

  const fn = control.actual
  const { didThrow, error, result } = captureError(() => fn())

  if (result instanceof Promise) {
    const replacement =
      errorClassOrMessage !== undefined ? 'toBeRejectedWith' : 'toBeRejected'
    control.fail({
      reason: `The function call returned a promise. To make this assertion work with async functions replace toThrow with ${replacement} and add await.`,
    })
  }

  if (!didThrow) {
    control.assert({
      success: false,
      reason:
        'The function call did not throw an error, but it was expected to.',
      negatedReason: '',
    })
    return
  }

  processError(
    control,
    error,
    'The function call threw',
    errorClassOrMessage,
    message,
  )
}
