import { buildSmartEqResult, SmartEqRule } from 'earljs/internals'

export const evilSmartEqRule: SmartEqRule = (actual, expected) => {
  if (actual === 2 && expected === 2) {
    return buildSmartEqResult(false)
  }
}
