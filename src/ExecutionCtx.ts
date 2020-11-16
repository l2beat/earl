import { PluginConfig } from './plugins/injectedConfig'

export class ExecutionCtx {
  public pluginConfig: PluginConfig | undefined
}

export default new ExecutionCtx()
