export abstract class Matcher {
  // @note: subclasses shouldn't change this but rather do proper typechecking - we can't rely on type system because we have untyped validators like toLooseEq
  abstract check(v: unknown): boolean
}
