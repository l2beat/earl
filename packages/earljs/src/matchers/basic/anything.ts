import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches any value.
     */
    anything(): never
  }
}

registerMatcher('anything', anything)

export function anything() {
  return () => true
}
