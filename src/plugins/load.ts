import { assert } from 'console'
import debug from 'debug'
const logger = debug('earl:plugins:load')

export type PluginLoader = (path: string) => Promise<void>

export const loadPlugin: PluginLoader = async (pluginPath) => {
  logger(`Loading earl plugin from ${pluginPath}`)
  const module = require(pluginPath)

  assert(module, `Plugin ${pluginPath} can't be loaded (missing main in package.json?)`)
  assert(module.default instanceof Function, `Plugin ${pluginPath} doesn't expose default export`)

  const pluginSetupFn = module.default

  await pluginSetupFn()
}

export interface PluginCtx {
  addValidator(name: string, validator: (...args: any[]) => any): void
  addMatcher(name: string, matcher: (...args: any[]) => any): void
}
