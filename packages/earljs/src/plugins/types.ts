import { Expectation } from '../Expectation'
import { SmartEqResult } from '../isEqual/rules'

export type DynamicValidator<T> = (this: Expectation<T>, ...args: any[]) => void | Promise<void>
export type DynamicMatcher = (...args: any[]) => any // real type should be Matcher but can be cast to anything for improved DX
export type SmartEqRule<TActual, TExpected> = (
  actual: TActual,
  expected: TExpected,
  strict: boolean,
) => SmartEqResult | undefined

export type PluginSmartEqRules<T> =
  | readonly SmartEqRule<T, T>[] // consider deprecating the array here?
  | Record<string, SmartEqRule<T, T>> // we need something that's possible to declaration merge

export interface PluginConfig {
  matchers?: Record<string, DynamicMatcher>
  validators?: Record<string, DynamicValidator<any>>
  smartEqRules?: PluginSmartEqRules<never>
}
