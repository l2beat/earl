import { createPlugin } from 'earljs/internals'

import { EvenNumberMatcher } from './EvenNumberMatcher'
import { evilSmartEqRule } from './evilSmartEqRule'
import { setEqualsArraySmartEqRule } from './setEqualsArraySmartEqRule'
import { toBeEven } from './toBeEven'

export const plugin = createPlugin({
  matchers: { evenNumber: EvenNumberMatcher.make },
  validators: { toBeEven },
  smartEqRules: { evilSmartEqRule, setEqualsArraySmartEqRule },
})
