import debug from 'debug'

import { PluginConfig } from './types'
const logger = debug('earljs:plugins:load')

import { loadMatchers } from '../expect'
import { loadValidators } from '../Expectation'
import { loadSmartEqRules } from '../validators/smartEq'

export type PluginLoader = (path: string) => Promise<PluginConfig>

export function loadPlugin(pluginConfig: Partial<PluginConfig>): void {
  logger(`Loading plugin: ${getPluginSummary(pluginConfig)}`)

  if (pluginConfig.matchers) {
    logger(`Loading matchers...`)
    loadMatchers(pluginConfig.matchers)
  }

  if (pluginConfig.validators) {
    logger(`Loading validators...`)
    loadValidators(pluginConfig.validators)
  }

  if (pluginConfig.smartEqRules) {
    logger(`Loading smart eq rules...`)
    loadSmartEqRules(pluginConfig.smartEqRules)
  }
}

function getPluginSummary(pluginConfig: Partial<PluginConfig>): string {
  let out = ''
  out += `Matchers: #${pluginConfig.matchers ? Object.keys(pluginConfig.matchers).length : 0} `
  out += `Validators: #${pluginConfig.validators ? Object.keys(pluginConfig.validators).length : 0} `
  out += `SmartEqRules: #${pluginConfig.smartEqRules?.length || 0} `

  return out
}
