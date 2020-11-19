import { AnyFunc, WrapWithName } from '../types'

export interface PluginConfig {
  matchers: WrapWithName<AnyFunc>[]
  validators: WrapWithName<AnyFunc>[]
}
