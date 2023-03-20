import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches falsy values.
     * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
     */
    falsy(): never
  }
}

registerMatcher('falsy', falsy)

export function falsy() {
  return (value: unknown) => !value
}
