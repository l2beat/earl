import { Matcher } from './Base'

export class DefinedMatcher extends Matcher {
  check(actual: unknown): boolean {
    return actual != null
  }

  toString(): string {
    return `[Defined]`
  }

  static make = () => new DefinedMatcher() as any
}

export class NullishMatcher extends Matcher {
  check(actual: unknown): boolean {
    return actual == null
  }

  toString(): string {
    return `[Nullish]`
  }

  static make = () => new NullishMatcher() as any
}
