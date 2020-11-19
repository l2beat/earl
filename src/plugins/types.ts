import { Expectation } from '../Expectation'
import { Matcher } from '../matchers/Base'
import { WrapWithName } from '../types'
import { SmartEqResult } from '../validators/smartEq'

export type DynamicValidator<T> = (this: Expectation<T>, ...args: any[]) => void | Promise<void>
export type DynamicMatcher = (...args: any[]) => Matcher
export type SmartEqRule = (actual: any, expected: any, strict: boolean) => SmartEqResult | undefined

export interface PluginConfig {
  matchers?: WrapWithName<DynamicMatcher>[]
  validators?: WrapWithName<DynamicValidator<any>>[]
  smartEqRules?: SmartEqRule[]
}
