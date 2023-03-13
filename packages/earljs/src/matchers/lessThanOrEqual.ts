import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less or equal to a given target.
     *
     * @param target - target value (inclusive)
     */
    lessThanOrEqual(target: number): number
  }
}

registerMatcher('lessThanOrEqual', lessThanOrEqual)

export function lessThanOrEqual(target: number) {
  return (value: unknown) => typeof value === 'number' && value <= target
}
