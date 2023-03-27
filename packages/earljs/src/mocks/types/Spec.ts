export type Spec =
  | ReturnSpec
  | LazyReturnSpec
  | ThrowSpec
  | ExecSpec
  | NotReadySpec

export interface ReturnSpec {
  type: 'return'
  value: any
}
/**
 * Used to lazily evaluate rejected promises so node doesn't think they are
 * unhandled
 */

export interface LazyReturnSpec {
  type: 'lazy-return'
  value: () => any
}

export interface ThrowSpec {
  type: 'throw'
  error: any
}

export interface ExecSpec {
  type: 'exec'
  implementation: (...args: any[]) => any
}

export interface NotReadySpec {
  type: 'not-ready'
}
