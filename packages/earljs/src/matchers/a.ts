import { Class2Primitive, NewableOrPrimitive } from '../types'
import { Matcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>
  }
}

registerMatcher(
  'anything',
  <T>(clazz: NewableOrPrimitive<T>) => new AMatcher<T>(clazz),
)

export class AMatcher<T> extends Matcher {
  constructor(private readonly clazz: NewableOrPrimitive<T>) {
    super()
  }

  check(v: unknown) {
    if (this.clazz === (String as any)) {
      return typeof v === 'string' || v instanceof String
    }
    if (this.clazz === (Number as any)) {
      return (typeof v === 'number' && !isNaN(v)) || v instanceof Number
    }
    if (this.clazz === (Boolean as any)) {
      return typeof v === 'boolean' || v instanceof Boolean
    }
    if (this.clazz === BigInt) {
      return typeof v === 'bigint' || v instanceof BigInt
    }
    if (this.clazz === (Function as any)) {
      return typeof v === 'function' || v instanceof Function
    }
    if (this.clazz === (Object as any)) {
      return typeof v === 'object' && v !== null
    }
    if (this.clazz === Symbol) {
      return typeof v === 'symbol'
    }
    if (this.clazz === (Array as any)) {
      return Array.isArray(v)
    }

    return v instanceof this.clazz
  }

  toString() {
    return `[A: ${this.clazz.name}]`
  }
}
