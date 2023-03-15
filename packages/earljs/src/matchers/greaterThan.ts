import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater than a given target.
     *
     * @param target - target value (inclusive)
     */
    greaterThan(target: number | bigint): number
  }
}

registerMatcher('greaterThan', greaterThan)

export function greaterThan(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value > target
}
