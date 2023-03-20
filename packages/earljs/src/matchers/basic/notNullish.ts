import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches values that are not nullish, i.e. values that are not `null` or `undefined`.
     */
    notNullish(): never
  }
}

registerMatcher('notNullish', notNullish)

export function notNullish() {
  return (value: unknown) => value != null
}
