import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less than a given target.
     *
     * @param target - target value (inclusive)
     */
    lessThan(target: number | bigint): number
  }
}

registerMatcher('lessThan', lessThan)

export function lessThan(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value < target
}
