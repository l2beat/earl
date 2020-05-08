import { InternalExpectation } from '../Expectation'
import { isEqualWith } from 'lodash'
import { Matcher } from '../matchers'

/**
 * Does deep "smart" equality check
 */
export function toEqual<T>(this: InternalExpectation<T>, expected?: T): void {
  if (!smartEq(this.actual, expected)) {
    if (arguments.length === 0) {
      console.log(`Autofixing ${JSON.stringify(this.actual)}...`)
      this.autofix(expected, this.actual)
    } else {
      throw new Error(`${JSON.stringify(this.actual)} not equal to ${JSON.stringify(expected)}`)
    }
  }
}

export function smartEq(actual: any, expected: any): boolean {
  return isEqualWith(actual, expected, (a: any, b: any) => {
    if (b instanceof Matcher) {
      return b.check(a)
    }
  })
}
