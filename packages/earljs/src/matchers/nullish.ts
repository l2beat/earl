import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    nullish(value: unknown): null | undefined
  }
}

registerMatcher('nullish', nullish)

export function nullish() {
  return (value: unknown) => value == null
}
