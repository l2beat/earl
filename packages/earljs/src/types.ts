import { Exact } from 'ts-essentials'

export interface Newable<T> {
  new (...args: any[]): T
}

// @note: don't use BigIntConstructor here to avoid relying on modern node typings being installed
export type BigIntLike = { asIntN: Function; asUintN: Function; (value?: any): any }

export type NewableOrPrimitive<T = any> = Newable<T> | SymbolConstructor | BigIntLike

export type Class2Primitive<T> = T extends String
  ? string
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : T extends BigIntLike
  ? bigint
  : T extends Symbol
  ? symbol
  : T extends Exact<Object, T>
  ? any
  : T extends Array<any>
  ? any[]
  : T

export type NonEmptyOnly<T> = keyof T extends never ? never : T
