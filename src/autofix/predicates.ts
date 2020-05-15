import { SafeDictionary } from 'ts-essentials'

type Env = SafeDictionary<string>

export function shouldPreventAutofix(env: Env = process.env) {
  return () => {
    return !!env['CI']
  }
}
