import { Matcher } from './Base'

/**
 * Matches any number close to the actual number. This range is INCLUSIVE.
 */
export class NumberCloseToMatcher extends Matcher {
  constructor(private readonly actual: number, private readonly delta: number) {
    super()
  }

  check(v: unknown): boolean {
    if (typeof v !== 'number') {
      return false
    }

    const max = this.actual + this.delta
    const min = this.actual - this.delta
    return v >= min && v <= max
  }

  toString(): string {
    return `[NumberCloseTo: ${this.actual}, ${this.delta}]`
  }

  static make(actual: number, { delta }: { delta: number }): number {
    return new NumberCloseToMatcher(actual, delta) as any
  }
}
