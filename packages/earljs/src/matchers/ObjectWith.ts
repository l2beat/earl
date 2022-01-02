import { formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { Matcher } from './Base'

function isObject(value: unknown): value is object {
  return value != null && (typeof value === 'object' || typeof value === 'function')
}

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

      return isEqual(actualValue, expectedValue)
    })
  }

  toString() {
    return `[ObjectWith: ${formatCompact(this.subset)}]`
  }

  static make(subset: Object): any {
    return new ObjectWithMatcher(subset)
  }
}
