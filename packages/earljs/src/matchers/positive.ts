import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are greater than 0.
     */
    positive(): number
  }
}

registerMatcher('positive', positive)

export function positive() {
  return (value: unknown) => typeof value === 'number' && value > 0
}
