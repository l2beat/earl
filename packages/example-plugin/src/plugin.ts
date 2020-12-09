import { EvenNumberMatcher } from './EvenNumberMatcher'
import { evilSmartEqRule } from './evilSmartEqRule'
import { toBeEven } from './toBeEven'

export const plugin = {
  matchers: { evenNumber: EvenNumberMatcher.make },
  validators: { toBeEven },
  smartEqRules: [evilSmartEqRule],
}
