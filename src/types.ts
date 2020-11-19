export interface Newable<T> {
  new (...args: any[]): T
}

// @note: don't use BigIntConstructor here to avoid relying on modern node typings being installed
export type BigIntLike = { asIntN: Function; asUintN: Function; (value?: any): any }

export type NewableOrPrimitive<T = any> = Newable<T> | SymbolConstructor | BigIntLike

export type WrapWithName<T> = { name: string; value: T }

export type AnyFunc = (...args: any[]) => any
