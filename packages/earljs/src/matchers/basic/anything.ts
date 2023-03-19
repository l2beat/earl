import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches any value.
     */
    anything(): any
  }
}

registerMatcher('anything', anything)

export function anything() {
  return () => true
}
