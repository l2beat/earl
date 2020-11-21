import { Expectation } from '../Expectation'
import { SmartEqResult } from '../validators/smartEq'

export type DynamicValidator<T> = (this: Expectation<T>, ...args: any[]) => void | Promise<void>
export type DynamicMatcher = (...args: any[]) => any // real type should be Matcher but can be casted to anything for improved DX
export type SmartEqRule = (actual: any, expected: any, strict: boolean) => SmartEqResult | undefined

export interface PluginConfig {
  matchers?: Record<string, DynamicMatcher>
  validators?: Record<string, DynamicValidator<any>>
  smartEqRules?: ReadonlyArray<SmartEqRule>
}
