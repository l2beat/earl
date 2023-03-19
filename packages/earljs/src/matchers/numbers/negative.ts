import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less than 0.
     *
     * Works for both numbers and bigints.
     */
    negative(): never
  }
}

registerMatcher('negative', negative)

export function negative() {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value < 0
}
