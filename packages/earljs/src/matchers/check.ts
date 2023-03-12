import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches values for which the predicate returns `true`.
     *
     * @param predicate - the function for checking values
     */
    check(predicate: (value: unknown) => boolean): any
  }
}

registerMatcher('check', check, () => 'check(???)')

export function check(predicate: (value: unknown) => boolean) {
  return (value: unknown) => predicate(value)
}
