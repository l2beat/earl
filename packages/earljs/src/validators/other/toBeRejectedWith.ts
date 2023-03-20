import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { captureAsyncError, processError } from './errors'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeRejected(
      this: Validators<(() => Promise<any>) | Promise<any>>,
    ): Promise<void>

    toBeRejectedWith(
      this: Validators<(() => Promise<any>) | Promise<any>>,
      message: string | RegExp,
    ): Promise<void>

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
