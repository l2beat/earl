import { createMatcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    stringMatching(substringOrPattern: string | RegExp): string
  }
}

registerMatcher('stringMatching', stringMatching)

export function stringMatching(substringOrPattern: string | RegExp) {
  return createMatcher(
    `[stringMatching: ${substringOrPattern.toString()}]`,
    (value: unknown) => {
      if (typeof value !== 'string') {
        return false
      }

      if (typeof substringOrPattern === 'string') {
        return value.includes(substringOrPattern)
      } else {
        return substringOrPattern.test(value)
      }
    },
  )
}
