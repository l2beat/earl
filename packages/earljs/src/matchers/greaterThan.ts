import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater than a given target.
     *
     * @param target - target value (inclusive)
     */
    greaterThan(target: number): number
  }
}

registerMatcher('greaterThan', greaterThan)

export function greaterThan(target: number) {
  return (value: unknown) => typeof value === 'number' && value > target
}
