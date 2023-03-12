import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    anything(): any
  }
}

registerMatcher('anything', anything)

export function anything() {
  return () => true
}
