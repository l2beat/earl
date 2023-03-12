import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches `null` and `undefined`
     */
    nullish(): any
    // we can't use null | undefined because it cannot be assigned to null and undefined
    // we can't use null & undefined because it evaluates to never
  }
}

registerMatcher('nullish', nullish)

export function nullish() {
  return (value: unknown) => value == null
}
