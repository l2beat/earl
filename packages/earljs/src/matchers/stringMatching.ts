import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches strings that contain the provided substring.
     *
     * @param pattern - a string to look for in the matched values or a regexp to test the matched values.
     */
    stringMatching(substringOrPattern: string | RegExp): string
  }
}

registerMatcher('stringMatching', stringMatching)

export function stringMatching(substringOrPattern: string | RegExp) {
  return (value: unknown) => {
    if (typeof value !== 'string') {
      return false
    }

    if (typeof substringOrPattern === 'string') {
      return value.includes(substringOrPattern)
    } else {
      return substringOrPattern.test(value)
    }
  }
}
