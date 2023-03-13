import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less than a given target.
     *
     * @param target - target value (inclusive)
     */
    lessThan(target: number): number
  }
}

registerMatcher('lessThan', lessThan)

export function lessThan(target: number) {
  return (value: unknown) => typeof value === 'number' && value < target
}
