import { createPlugin } from 'earljs/internals'

import { plugin } from './dist'

declare module 'earljs' {
  interface Expect extends createPlugin.MatchersOf<typeof plugin> {}
  interface Validators extends createPlugin.ValidatorsOf<typeof plugin> {}
  interface SmartEqRules extends createPlugin.SmartEqRulesOf<typeof plugin> {}
}
