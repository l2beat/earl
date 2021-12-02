import { buildSmartEqResult, SmartEqRule } from 'earljs/internals'

export const setEqualsArraySmartEqRule: SmartEqRule<Set<unknown>, unknown[]> = (actual, expected) => {
  if (expected.every((x) => actual.has(x))) {
    return buildSmartEqResult(true)
  }
}
