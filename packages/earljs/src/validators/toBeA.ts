import { Control } from '../Control'
import { formatCompact } from '../format'
import { AMatcher } from '../matchers'

export function toBeA<T>(control: Control<T>, clazz: any) {
  const m = new AMatcher(clazz)
  const actualFmt = formatCompact(control.actual)
  const clazzFormat = formatClazz(clazz)
  control.assert({
    success: m.check(control.actual),
    reason: `${actualFmt} is not ${clazzFormat}`,
    negatedReason: `${actualFmt} is ${clazzFormat}`,
  })
}

function formatClazz(clazz: any) {
  if (clazz === String) {
    return 'a string'
  } else if (clazz === Boolean) {
    return 'a boolean'
  } else if (clazz === Number) {
    return 'a number'
  } else if (clazz === BigInt) {
    return 'a bigint'
  } else if (clazz === Array) {
    return 'an array'
  } else if (clazz === Function) {
    return 'a function'
  } else if (clazz === Object) {
    return 'an object'
  } else if (clazz === Symbol) {
    return 'a symbol'
  } else {
    return `an instance of ${formatCompact(clazz)}`
  }
}
