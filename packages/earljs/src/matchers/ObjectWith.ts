import { isObject } from 'lodash'

import { formatValue } from '../validators/common'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

export class ObjectWithMatcher<T extends Object> extends Matcher {
  constructor(private readonly subset: T) {
    super()
  }

  check(actualItem: unknown): boolean {
    if (!isObject(actualItem)) {
      return false
    }

    const expectedEntries = Object.entries(this.subset)

    return expectedEntries.every(([expectedKey, expectedValue]) => {
      const actualValue = (actualItem as any)[expectedKey]

      return smartEq(actualValue, expectedValue).result === 'success'
    })
  }

  toString() {
    return `[ObjectWith: ${formatValue(this.subset)}]`
  }

  static make(subset: Object): any {
    return new ObjectWithMatcher(subset)
  }
}
