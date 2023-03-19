import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { a, NewableOrPrimitive } from '../../matchers/basic/a'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeA<C extends NewableOrPrimitive>(clazz: C): R
  }
}

registerValidator('toBeA', toBeA)

export function toBeA(control: Control, clazz: NewableOrPrimitive) {
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
