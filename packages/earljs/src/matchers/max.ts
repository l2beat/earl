import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less or equal to a given maximum.
     *
     * @param max - maximum value (inclusive)
     */
    max(max: number): number
  }
}

registerMatcher('max', max)

export function max(max: number) {
  return (value: unknown) => typeof value === 'number' && value <= max
}
