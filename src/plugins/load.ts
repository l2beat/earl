import { assert } from 'console'
import debug from 'debug'

import { PluginConfig } from './injectedConfig'
const logger = debug('earl:plugins:load')

export type PluginLoader = (path: string) => Promise<PluginConfig>

export const loadPluginFromPath: PluginLoader = async (pluginPath) => {
  logger(`Loading earl plugin from ${pluginPath}`)
  const module = require(pluginPath)

  assert(module, `Plugin ${pluginPath} can't be loaded (missing main in package.json?)`)
  assert(module.default instanceof Function, `Plugin ${pluginPath} doesn't expose default export`)

  const pluginSetupFn = module.default

  return loadPlugin(pluginSetupFn)
}

export async function loadPlugin(setupFn: Function): Promise<PluginConfig> {
  const pluginConfig = await setupFn()

  // TODO: some sanity version

  return pluginConfig
}
