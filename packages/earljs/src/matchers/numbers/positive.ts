import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater than 0.
     *
     * Works for both numbers and bigints.
     */
    positive(): never
  }
}

registerMatcher('positive', positive)

export function positive() {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value > 0
}
