import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches `null` and `undefined`
     */
    nullish(): never
  }
}

registerMatcher('nullish', nullish)

export function nullish() {
  return (value: unknown) => value == null
}
