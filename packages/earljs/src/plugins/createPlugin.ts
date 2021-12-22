import { SmartEqRule } from '.'
import { PluginConfig } from './types'

/**
 * Used to create a new EarlJS plugin and preserve its types for declaration merging.
 *
 * @example
 * ```ts
 * const plugin = createPlugin({
 *   // your matchers, validators, and smartEqRules
 * })
 *
 * declare module 'earljs' {
 *   interface Expect extends createPlugin.MatchersOf<typeof plugin> {}
 *   interface Expectation<_> extends createPlugin.ValidatorsOf<typeof plugin> {}
 *   interface SmartEqRules extends createPlugin.SmartEqRulesOf<typeof plugin> {}
 * }
 * ```
 */
export function createPlugin<TConfig extends PluginConfig>(config: TConfig) {
  // There is currently no validation here, the only reason for this function
  // is to provide autocomplete while preserving the type for declaration merging.
  return config
}

export declare namespace createPlugin {
  export type MatchersOf<TPlugin extends PluginConfig> = TPlugin['matchers']
  export type ValidatorsOf<TPlugin extends PluginConfig> = TPlugin['validators']
  export type SmartEqRulesOf<TPlugin extends PluginConfig> = TPlugin['smartEqRules'] extends any[]
    ? 'Error: smartEqRules must be dictionary with unique keys for declaration merging'
    : __OmitRuleForUnknown<Exclude<TPlugin['smartEqRules'], undefined | readonly any[]>>
}

// We can't have `SmartEqRule<unknown, unknown> in SmartEqRules, because it will break all other types.
export type __OmitRuleForUnknown<TRules extends Record<string, SmartEqRule<never, never>>> = {
  [P in keyof TRules as TRules[P] extends SmartEqRule<unknown, unknown> ? never : P]: TRules[P]
}
