import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater or equal to a given target.
     *
     * @param target - target value (inclusive)
     */
    greaterThanOrEqual(target: number): number
  }
}

registerMatcher('greaterThanOrEqual', greaterThanOrEqual)

export function greaterThanOrEqual(target: number) {
  return (value: unknown) => typeof value === 'number' && value >= target
}
