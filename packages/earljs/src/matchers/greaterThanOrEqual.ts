import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater than or equal to a given target.
     *
     * @param target - target value (inclusive)
     */
    greaterThanOrEqual(target: number | bigint): number
  }
}

registerMatcher('greaterThanOrEqual', greaterThanOrEqual)

export function greaterThanOrEqual(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value >= target
}
