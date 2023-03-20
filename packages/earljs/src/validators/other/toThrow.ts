import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { captureError, processError } from './errors'

declare module '../../expect' {
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
  control: Control,
  errorClassOrMessage?: (new (...args: any[]) => Error) | string | RegExp,
  message?: string | RegExp,
): void {
  if (typeof control.actual !== 'function') {
    const actualInline = formatCompact(control.actual)
    return control.fail({
      reason: `The value ${actualInline} is not a function, but it was expected to be a function.`,
    })
  }

  const fn = control.actual
  const { didThrow, error, result } = captureError(() => fn())

  if (result instanceof Promise) {
    const replacement =
      errorClassOrMessage !== undefined ? 'toBeRejectedWith' : 'toBeRejected'
    return control.fail({
      reason: `The function call returned a promise. To make this assertion work with async functions replace toThrow with ${replacement} and add await.`,
    })
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
    error,
    'The function call threw',
    errorClassOrMessage,
    message,
  )
}
