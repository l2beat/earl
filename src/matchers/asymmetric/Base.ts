export abstract class AsymmetricMatcher<T> {
  __type!: T
  abstract check(v: any): boolean
  abstract toString(): string
}
