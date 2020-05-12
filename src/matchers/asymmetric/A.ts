import { AsymmetricMatcher } from './Base'

interface Newable {
  new (...args: any[]): any
}

// @note: don't use BigIntContructor here to avoid relying on modern node typings being installed
type BigIntLike = { asIntN: Function; asUintN: Function; (value?: any): any }

type NewableOrPrimitive = Newable | SymbolConstructor | BigIntLike

/**
 * Matches a instance of a class.
 * It's works with primitives as expected (uses typeof).
 * When matching Object won't match nulls.
 */
export class AMatcher extends AsymmetricMatcher {
  constructor(private readonly clazz: NewableOrPrimitive) {
    super()
  }

  toString() {
    return 'AMatcher'
  }

  check(v: any) {
    if (this.clazz === String) {
      return typeof v === 'string' || v instanceof String
    }
    if (this.clazz === Number) {
      return typeof v === 'number' || v instanceof Number
    }
    if (this.clazz === Boolean) {
      return typeof v === 'boolean' || v instanceof Boolean
    }
    if (this.clazz === BigInt) {
      return typeof v === 'bigint' || v instanceof BigInt
    }
    if (this.clazz === Function) {
      return typeof v === 'function' || v instanceof Function
    }
    if (this.clazz === Object) {
      return typeof v === 'object' && v !== null
    }
    if (this.clazz === Symbol) {
      return typeof v === 'symbol'
    }
    if (this.clazz === Array) {
      return Array.isArray(v)
    }

    return v instanceof this.clazz
  }

  static make(clazz: NewableOrPrimitive): AMatcher {
    return new AMatcher(clazz)
  }
}
