import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are integers between Number.MIN_SAFE_INTEGER nad Number.MAX_SAFE_INTEGER
     */
    integer(): never
  }
}

registerMatcher('integer', integer)

export function integer() {
  return (value: unknown) =>
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= Number.MIN_SAFE_INTEGER &&
    value <= Number.MAX_SAFE_INTEGER
}
