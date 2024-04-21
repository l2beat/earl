export type Spec =
  | ReturnSpec
  | LazyReturnSpec
  | ThrowSpec
  | ExecSpec
  | NotReadySpec

export interface ReturnSpec {
  type: 'return'
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  value: any
}
/**
 * Used to lazily evaluate rejected promises so node doesn't think they are
 * unhandled
 */

export interface LazyReturnSpec {
  type: 'lazy-return'
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  value: () => any
}

export interface ThrowSpec {
  type: 'throw'
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  error: any
}

export interface ExecSpec {
  type: 'exec'
  // biome-ignore lint: both any are required here
  implementation: (...args: any[]) => any
}

export interface NotReadySpec {
  type: 'not-ready'
}
