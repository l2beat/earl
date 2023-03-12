import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are integers. Doesn't check against Number.MIN_SAFE_INTEGER nad Number.MAX_SAFE_INTEGER.
     */
    unsafeInteger(): number
  }
}

registerMatcher('unsafeInteger', unsafeInteger)

export function unsafeInteger() {
  return (value: unknown) =>
    typeof value === 'number' && Number.isInteger(value)
}
