export const noop = (..._args: any[]) => {}

export function passes(f: () => void) {
  try {
    f()
    return true
  } catch {
    return false
  }
}
