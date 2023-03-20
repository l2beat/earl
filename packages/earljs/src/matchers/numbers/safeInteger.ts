import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are integers between Number.MIN_SAFE_INTEGER nad Number.MAX_SAFE_INTEGER.
     *
     * Works for both numbers and bigints.
     */
    safeInteger(): never
  }
}

registerMatcher('safeInteger', safeInteger)

export function safeInteger() {
  return (value: unknown) => {
    if (typeof value === 'number' && !Number.isInteger(value)) {
      return false
    }
    if (typeof value === 'number' || typeof value === 'bigint') {
      return (
        value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
      )
    }
    return false
  }
}
