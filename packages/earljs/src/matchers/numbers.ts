import { Matcher } from './Base'

abstract class BaseNumberMatcher extends Matcher {
  constructor(private target: number) {
    super()
  }

  protected abstract compare(a: number, b: number): boolean
  protected abstract name: string

  check(value: unknown) {
    if (typeof value !== 'number') {
      return false
    }
    return this.compare(value, this.target)
  }

  toString(): string {
    return `[${this.name}: ${this.target}]`
  }
}

export class NumberGreaterThanMatcher extends BaseNumberMatcher {
  name = 'NumberGreaterThan'

  compare(a: number, b: number) {
    return a > b
  }

  static make(target: number): number {
    return new NumberGreaterThanMatcher(target) as any
  }
}

export class NumberGreaterThanOrEqualToMatcher extends BaseNumberMatcher {
  name = 'NumberGreaterThanOrEqualTo'

  compare(a: number, b: number) {
    return a >= b
  }

  static make(target: number): number {
    return new NumberGreaterThanOrEqualToMatcher(target) as any
  }
}

export class NumberLessThanMatcher extends BaseNumberMatcher {
  name = 'NumberLessThan'

  compare(a: number, b: number) {
    return a < b
  }

  static make(target: number): number {
    return new NumberLessThanMatcher(target) as any
  }
}

export class NumberLessThanOrEqualToMatcher extends BaseNumberMatcher {
  name = 'NumberLessThanOrEqualTo'

  compare(a: number, b: number) {
    return a <= b
  }

  static make(target: number): number {
    return new NumberLessThanOrEqualToMatcher(target) as any
  }
}
