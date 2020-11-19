import debug from 'debug'

import { PluginConfig } from './types'
const logger = debug('earl:plugins:load')

import { loadMatchers } from '../expect'
import { Expectation } from '../Expectation'
import { loadSmartEqRules } from '../validators/smartEq'

export type PluginLoader = (path: string) => Promise<PluginConfig>

export function loadPlugin(setupFn: Function): void {
  logger(`Loading plugin: ${setupFn}`)
  const pluginConfig = setupFn() as Partial<PluginConfig>

  if (pluginConfig.matchers && pluginConfig.matchers instanceof Array) {
    logger(`Loading matchers: ${pluginConfig.matchers.length}`)
    loadMatchers(pluginConfig.matchers)
  }

  if (pluginConfig.validators && pluginConfig.validators instanceof Array) {
    logger(`Loading validators: ${pluginConfig.validators.length}`)
    Expectation.loadValidators(pluginConfig.validators)
  }

  if (pluginConfig.smartEqRules && pluginConfig.smartEqRules instanceof Array) {
    logger(`Loading smart eq rules: ${pluginConfig.smartEqRules.length}`)
    loadSmartEqRules(pluginConfig.smartEqRules)
  }
}
