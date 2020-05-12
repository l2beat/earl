import { isEqualWith } from 'lodash'

import { Expectation, InternalExpectation } from '../Expectation'
import { AsymmetricMatcher } from './asymmetric/Base'

export type ValueOrMatcher<T> = T extends {}
  ? {
      [P in keyof T]: T[P] | AsymmetricMatcher<T[P]>
    }
  : T | AsymmetricMatcher<T>

/**
 * Does deep "smart" equality check
 */
export function toEqual<T>(this: Expectation<T>, expected?: ValueOrMatcher<T>): void {
  const internalThis = (this as any) as InternalExpectation<T>

  if (!smartEq(internalThis.actual, expected)) {
    if (arguments.length === 0) {
      console.log(`Autofixing ${JSON.stringify(internalThis.actual)}...`)

      internalThis.autofix('toEqual', internalThis.actual)
    } else {
      throw new Error(`${JSON.stringify(internalThis.actual)} not equal to ${JSON.stringify(expected)}`)
    }
  }
}

export function smartEq(actual: any, expected: any): boolean {
  return isEqualWith(actual, expected, (a: any, b: any) => {
    if (b instanceof AsymmetricMatcher) {
      return b.check(a)
    }
  })
}
