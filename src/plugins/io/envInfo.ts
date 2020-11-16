import { join } from 'path'

export interface EnvInfo {
  findNodeModules(): string
}

export const realEnvInfo: EnvInfo = {
  // note: this is a simplified implementation that relies on a fact that package manger
  // will put direct dependencies on the same level in the directory tree and it assumes
  // that earl and its plugins will be direct dependencies
  findNodeModules: () => {
    return join(__dirname, '../../../../')
  },
}
