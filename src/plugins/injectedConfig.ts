type AnyFunc = (...args: any[]) => any
type WithName<T> = { name: string; value: T }

export interface PluginConfig {
  matchers: WithName<AnyFunc>[]
  validators: WithName<AnyFunc>[]
}

export function mergeConfigs(configs: PluginConfig[]): PluginConfig {
  const validators = configs.reduce<WithName<AnyFunc>[]>((a, c) => [...a, ...c.validators], [])
  const matchers = configs.reduce<WithName<AnyFunc>[]>((a, c) => [...a, ...c.matchers], [])

  return {
    validators,
    matchers,
  }
}
