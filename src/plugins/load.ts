import debug from 'debug'

import { PluginConfig } from './types'
const logger = debug('earl:plugins:load')

import { loadMatchers } from '../expect'
import { Expectation } from '../Expectation'

export type PluginLoader = (path: string) => Promise<PluginConfig>

// export const loadPluginFromPath: PluginLoader = async (pluginPath) => {
//   logger(`Loading earl plugin from ${pluginPath}`)
//   const module = require(pluginPath)

//   assert(module, `Plugin ${pluginPath} can't be loaded (missing main in package.json?)`)
//   assert(module.default instanceof Function, `Plugin ${pluginPath} doesn't expose default export`)

//   const pluginSetupFn = module.default

//   return loadPlugin(pluginSetupFn)
// }

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
}
