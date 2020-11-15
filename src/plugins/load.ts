export type PluginLoader = (path: string) => void

export const loadPlugin: PluginLoader = (_pluginPath) => {}
