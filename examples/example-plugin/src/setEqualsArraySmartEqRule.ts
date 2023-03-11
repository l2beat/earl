import { buildSmartEqResult, SmartEqRule } from 'earljs/internals'

export const setEqualsArraySmartEqRule: SmartEqRule<Set<unknown>, unknown[]> = (
  actual,
  expected,
) => {
  if (!(actual instanceof Set && expected instanceof Array)) return

  const result = expected.every((x) => actual.has(x))

  return buildSmartEqResult(result)
}
