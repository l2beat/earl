import { createMatcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    anything(): any
  }
}

registerMatcher('anything', anything)

export function anything() {
  return createMatcher(`[anything]`, () => true)
}
