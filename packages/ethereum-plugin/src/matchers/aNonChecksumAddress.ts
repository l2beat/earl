import { Matcher } from 'earljs/internals'

import { isNonChecksumAdress } from '../utils'

/**
 * matches non-checksummed addresses
 */
export class NonChecksumAddressMatcher extends Matcher {
  check(value: unknown) {
    if (typeof value !== 'string') {
      return false
    }
    return isNonChecksumAdress(value)
  }

  toString() {
    return 'Address'
  }

  static make(): string {
    return new NonChecksumAddressMatcher() as any
  }
}
