export const noop = (..._args: any[]) => {}

export function clearModuleCache() {
  Object.keys(require.cache).forEach(function (key) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete require.cache[key]
  })
}

export function passes(f: () => void) {
  try {
    f()
    return true
  } catch {
    return false
  }
}
