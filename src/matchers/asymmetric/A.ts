import { AsymmetricMatcher } from './Base'

interface Newable {
  new (...args: any[]): any
}

/**
 * Matches a instance of a class. It's works with primitives as expected (uses typeof)
 */
export class AMatcher extends AsymmetricMatcher {
  // @todo proper type
  constructor(private readonly clazz: Newable) {
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
      return typeof v === 'boolean' || v instanceof Number
    }
    return v instanceof this.clazz
  }

  static make(clazz: Newable): AMatcher {
    return new AMatcher(clazz)
  }
}
