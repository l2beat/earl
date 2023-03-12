import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches truthy values.
     * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
     */
    truthy(): any
  }
}

registerMatcher('truthy', truthy)

export function truthy() {
  return (value: unknown) => !!value
}
