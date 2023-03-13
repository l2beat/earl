import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches values for which the predicate returns `true`.
     *
     * @param predicate - the function for checking values
     */
    satisfies(predicate: (value: unknown) => boolean): any
  }
}

registerMatcher('satisfies', satisfies, () => 'satisfies(???)')

export function satisfies(predicate: (value: unknown) => boolean) {
  return (value: unknown) => predicate(value)
}
