import { isEqualWith } from 'lodash'

import { autofix } from './autofix'
import { Matcher } from './matchers'

export class Expectation<T> {
  constructor(private readonly actual: T) {}

  /**
   * Does deep "smart" equality check.
   * By smart I mean it work with matchers like expect.anything()
   */
  toEqual(expected?: T): void {
    if (!smartEq(this.actual, expected)) {
      if (expected === undefined) {
        console.log(`Autofixing ${JSON.stringify(this.actual)}...`)
        autofix(expected, this.actual)
      } else {
        throw new Error(`${JSON.stringify(this.actual)} not equal to ${JSON.stringify(expected)}`)
      }
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
