export const noop = (..._args: any[]) => {}

export function clearModuleCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}
