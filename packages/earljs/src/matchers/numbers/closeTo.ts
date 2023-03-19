import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are close to the target value.
     * The range is [target - delta, target + delta] (inclusive).
     *
     * @param target - number to aim for
     * @param delta - maximum difference between the values
     */
    closeTo(target: number, delta: number): never
  }
}

registerMatcher('closeTo', closeTo)

export function closeTo(target: number, delta: number) {
  const min = target - delta
  const max = target + delta
  return (value: unknown) =>
    typeof value === 'number' && value >= min && value <= max
}
