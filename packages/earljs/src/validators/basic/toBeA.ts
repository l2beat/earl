import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { a, Newable, NewableOrPrimitive } from '../../matchers/basic/a'

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

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeA<C extends NewableOrPrimitive>(clazz: C): Class2Primitive<C>
  }
}

registerValidator('toBeA', toBeA)

export function toBeA(control: Control<unknown>, clazz: NewableOrPrimitive) {
  const actualInline = formatCompact(control.actual)
  const clazzInline = getClassName(clazz)

  control.assert({
    success: a(clazz)(control.actual),
    reason: `The value ${actualInline} is not ${clazzInline}, but it was expected to be ${clazzInline}.`,
    negatedReason: `The value ${actualInline} is ${clazzInline}, but it was expected not to be ${clazzInline}.`,
  })
}

function getClassName(clazz: NewableOrPrimitive) {
  if (clazz === String) {
    return 'a string'
  } else if (clazz === Number) {
    return 'a number'
  } else if (clazz === Boolean) {
    return 'a boolean'
  } else if (clazz === BigInt) {
    return 'a bigint'
  } else if (clazz === Function) {
    return 'a function'
  } else if (clazz === Object) {
    return 'an object'
  } else if (clazz === Symbol) {
    return 'a symbol'
  } else if (clazz === Array) {
    return 'an array'
  }
  if (typeof clazz === 'function') {
    return `an instance of ${clazz.name}`
  }
  return `an instance of ${formatCompact(clazz)}`
}
