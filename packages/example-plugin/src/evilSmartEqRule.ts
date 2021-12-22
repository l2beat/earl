import { buildSmartEqResult, SmartEqRule } from 'earljs/internals'

export const evilSmartEqRule: SmartEqRule<unknown, unknown> = (actual, expected) => {
  if (actual === 2 && expected === 2) {
    return buildSmartEqResult(false)
  }
}
