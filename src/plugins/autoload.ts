import debug from 'debug'
import { basename } from 'path'

import { EnvInfo } from './io/envInfo'
import { Fs } from './io/fs'
import { PluginLoader } from './load'

const EARL_PLUGIN_NAME_REGEXP = /^earljs-plugin-(.*)$/

const logger = debug('earl:plugins:autoload')

export async function autoloadPlugins({
  envInfo,
  fs,
  loadPlugin,
}: {
  envInfo: EnvInfo
  fs: Fs
  loadPlugin: PluginLoader
}): Promise<void> {
  const nodeModulesPaths = envInfo.findNodeModules()

  await autoloadPluginsFromDir({ fs, loadPlugin }, nodeModulesPaths)
}

export async function autoloadPluginsFromDir(
  { fs, loadPlugin }: { fs: Fs; loadPlugin: PluginLoader },
  dir: string,
): Promise<void> {
  logger(`Loading plugins from: ${dir}`)
  const plugins = findPluginsInDir({ fs }, dir)
  logger(`Loading plugins from: ${dir}. Found ${plugins.length} plugins`)

  for (const plugin of plugins) {
    await loadPlugin(plugin)
  }
}

export function findPluginsInDir({ fs }: { fs: Fs }, dir: string): string[] {
  const files = fs.listDir(dir)

  const plugins = files.filter((filePath) => {
    const name = basename(filePath)
    return EARL_PLUGIN_NAME_REGEXP.test(name)
  })

  return plugins
}
