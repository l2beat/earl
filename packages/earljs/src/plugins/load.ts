import debug from 'debug'

import { PluginConfig } from './types'
const logger = debug('earljs:plugins:load')

import { loadMatchers } from '../expect'
import { loadValidators } from '../Expectation'
import { loadSmartEqRules } from '../validators/smartEq'

export type PluginLoader = (path: string) => Promise<PluginConfig>

export function loadPlugin(pluginConfig: Partial<PluginConfig>): void {
  logger(`Loading plugin: ${JSON.stringify(pluginConfig)}`)

  if (pluginConfig.matchers) {
    logger(`Loading matchers: ${pluginConfig.matchers.length}`)
    loadMatchers(pluginConfig.matchers)
  }

  if (pluginConfig.validators) {
    logger(`Loading validators: ${pluginConfig.validators.length}`)
    loadValidators(pluginConfig.validators)
  }

  if (pluginConfig.smartEqRules) {
    logger(`Loading smart eq rules: ${pluginConfig.smartEqRules.length}`)
    loadSmartEqRules(pluginConfig.smartEqRules)
  }
}
