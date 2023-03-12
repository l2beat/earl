export type Newable<T> = new (...args: any[]) => T

export type NewableOrPrimitive =
  | Newable<any>
  | SymbolConstructor
  | BigIntConstructor

export type Class2Primitive<T extends NewableOrPrimitive> =
  T extends StringConstructor
    ? string
    : T extends NumberConstructor
    ? number
    : T extends BooleanConstructor
    ? boolean
    : T extends BigIntConstructor
    ? bigint
    : T extends SymbolConstructor
    ? symbol
    : T extends FunctionConstructor
    ? () => any
    : T extends ObjectConstructor
    ? any // we can't use object or record because of missing keys
    : T extends ArrayConstructor
    ? any[]
    : T extends Newable<infer R>
    ? R
    : never
