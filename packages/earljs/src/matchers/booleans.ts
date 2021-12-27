import { Matcher } from './Base'

export class TruthyMatcher extends Matcher {
  check(actual: unknown): boolean {
    return !!actual
  }

  toString(): string {
    return `[Truthy]`
  }

  static make = () => new TruthyMatcher() as any
}

export class FalsyMatcher extends Matcher {
  check(actual: unknown): boolean {
    return !actual
  }

  toString(): string {
    return `[Falsy]`
  }

  static make = () => new FalsyMatcher() as any
}
