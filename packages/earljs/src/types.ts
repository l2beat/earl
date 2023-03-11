/* eslint-disable @typescript-eslint/ban-types */
import { Exact } from 'ts-essentials'

export type Newable<T> = new (...args: any[]) => T

// @note: don't use BigIntConstructor here to avoid relying on modern node typings being installed
export interface BigIntLike {
  asIntN: Function
  asUintN: Function
  (value?: any): any
}

export type NewableOrPrimitive<T = any> = Newable<T> | SymbolConstructor | BigIntLike

export type Class2Primitive<T> = T extends string
  ? string
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : T extends BigIntLike
  ? bigint
  : T extends Symbol
  ? symbol
  : T extends Function
  ? () => any
  : T extends Exact<Object, T>
  ? any
  : T extends any[]
  ? any[]
  : T

export type NonEmptyOnly<T> = keyof T extends never ? never : T
