import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches defined values, i.e. values that are not `null` or `undefined`.
     */
    defined(): any
  }
}

registerMatcher('defined', defined)

export function defined() {
  return (value: unknown) => value != null
}
