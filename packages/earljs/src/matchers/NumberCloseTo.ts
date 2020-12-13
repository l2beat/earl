import { Matcher } from './Base'

export class NumberCloseToMatcher extends Matcher {
  constructor(private readonly target: number, private readonly delta: number) {
    super()
  }

  check(v: unknown): boolean {
    if (typeof v !== 'number') {
      return false
    }

    const max = this.target + this.delta
    const min = this.target - this.delta
    return v >= min && v <= max
  }

  toString(): string {
    return `[NumberCloseTo: ${this.target}, delta=${this.delta}]`
  }

  static make(target: number, { delta }: { delta: number }): number {
    return new NumberCloseToMatcher(target, delta) as any
  }
}
