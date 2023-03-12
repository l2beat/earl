import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    nullish(): any // we can't use null | undefined because it cannot be assigned to null and undefined
  }
}

registerMatcher('nullish', nullish)

export function nullish() {
  return (value: unknown) => value == null
}
