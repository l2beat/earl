import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are less than 0.
     */
    negative(): number
  }
}

registerMatcher('negative', negative)

export function negative() {
  return (value: unknown) => typeof value === 'number' && value < 0
}
