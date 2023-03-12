import { registerMatcher } from '../expect'
import { Class2Primitive, NewableOrPrimitive } from '../types'

declare module '../expect' {
  interface Matchers {
    a<T extends NewableOrPrimitive>(type: T): Class2Primitive<T>
  }
}

registerMatcher('a', a, (clazz) => `a(${clazz.name})`)

export function a(clazz: NewableOrPrimitive) {
  return (value: unknown) => {
    if (clazz === String) {
      return typeof value === 'string'
    } else if (clazz === Number) {
      return typeof value === 'number' && !isNaN(value)
    } else if (clazz === Boolean) {
      return typeof value === 'boolean'
    } else if (clazz === BigInt) {
      return typeof value === 'bigint'
    } else if (clazz === Function) {
      return typeof value === 'function'
    } else if (clazz === Object) {
      return typeof value === 'object' && value !== null
    } else if (clazz === Symbol) {
      return typeof value === 'symbol'
    } else if (clazz === Array) {
      return Array.isArray(value)
    } else {
      return value instanceof clazz
    }
  }
}
