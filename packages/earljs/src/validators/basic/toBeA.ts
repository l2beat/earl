import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { a, NewableOrPrimitive } from '../../matchers/basic/a'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toBeA<C extends NewableOrPrimitive>(type: C): void
  }
}

registerValidator('toBeA', toBeA)

export function toBeA(control: Control, type: NewableOrPrimitive) {
  const actualInline = formatCompact(control.actual)
  const typeInline = getTypeName(type)

  control.assert({
    success: a(type)(control.actual),
    reason: `The value ${actualInline} is not ${typeInline}, but it was expected to be ${typeInline}.`,
    negatedReason: `The value ${actualInline} is ${typeInline}, but it was expected not to be ${typeInline}.`,
  })
}

function getTypeName(type: NewableOrPrimitive) {
  if (type === String) {
    return 'a string'
  } else if (type === Number) {
    return 'a number'
  } else if (type === Boolean) {
    return 'a boolean'
  } else if (type === BigInt) {
    return 'a bigint'
  } else if (type === Function) {
    return 'a function'
  } else if (type === Object) {
    return 'an object'
  } else if (type === Symbol) {
    return 'a symbol'
  } else if (type === Array) {
    return 'an array'
  }
  if (typeof type === 'function') {
    return `an instance of ${type.name}`
  }
  return `an instance of ${formatCompact(type)}`
}
