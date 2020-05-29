import { Matcher } from './Base'

/**
 * Matches any number close to the actual number. This range is INCLUSIVE.
 */
export class NumberCloseTo extends Matcher {
  constructor(private readonly actual: number, private readonly delta: number) {
    super()
  }

  check(v: any): boolean {
    const max = this.actual + this.delta
    const min = this.actual - this.delta
    return v >= min && v <= max
  }

  static make(actual: number, delta: number): number {
    return new NumberCloseTo(actual, delta) as any
  }
}
