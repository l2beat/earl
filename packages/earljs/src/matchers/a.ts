import { Class2Primitive, NewableOrPrimitive } from '../types'
import { createMatcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>
  }
}

registerMatcher('a', a)

export function a<T>(clazz: NewableOrPrimitive<T>) {
  return createMatcher(`[a: ${clazz.name}]`, (value: unknown) => {
    if (clazz === (String as any)) {
      return typeof value === 'string' || value instanceof String
    }
    if (clazz === (Number as any)) {
      return (
        (typeof value === 'number' && !isNaN(value)) || value instanceof Number
      )
    }
    if (clazz === (Boolean as any)) {
      return typeof value === 'boolean' || value instanceof Boolean
    }
    if (clazz === BigInt) {
      return typeof value === 'bigint' || value instanceof BigInt
    }
    if (clazz === (Function as any)) {
      return typeof value === 'function' || value instanceof Function
    }
    if (clazz === (Object as any)) {
      return typeof value === 'object' && value !== null
    }
    if (clazz === Symbol) {
      return typeof value === 'symbol'
    }
    if (clazz === (Array as any)) {
      return Array.isArray(value)
    }

    return value instanceof clazz
  })
}
