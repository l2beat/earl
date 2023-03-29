import { registerMatcher } from 'earl'

declare module 'earl' {
  interface Matchers {
    evenNumber(): number
  }
}

registerMatcher('evenNumber', evenNumber)

function evenNumber() {
  return (value: unknown): boolean => {
    return typeof value === 'number' && value % 2 === 0
  }
}
