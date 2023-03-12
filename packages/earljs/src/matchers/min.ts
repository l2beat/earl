import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater or equal to a given minimum.
     *
     * @param min - minimum value (inclusive)
     */
    min(min: number): number
  }
}

registerMatcher('min', min)

export function min(min: number) {
  return (value: unknown) => typeof value === 'number' && value >= min
}
