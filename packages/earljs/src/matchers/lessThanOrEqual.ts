import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less than or equal to a given target.
     *
     * @param target - target value (inclusive)
     */
    lessThanOrEqual(target: number | bigint): number
  }
}

registerMatcher('lessThanOrEqual', lessThanOrEqual)

export function lessThanOrEqual(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value <= target
}
