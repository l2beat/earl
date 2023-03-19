import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are integers.
     *
     * Works for both numbers and bigints.
     */
    integer(): never
  }
}

registerMatcher('integer', integer)

export function integer() {
  return (value: unknown) => {
    if (typeof value === 'number') {
      return Number.isInteger(value)
    } else if (typeof value === 'bigint') {
      return true
    }
    return false
  }
}
