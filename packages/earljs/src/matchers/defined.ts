import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches values that are not `undefined`.
     */
    defined(): any
  }
}

registerMatcher('defined', defined)

export function defined() {
  return (value: unknown) => value !== undefined
}
