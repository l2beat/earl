import { registerMatcher } from '../../expect.js'
import { isEqual } from '../../isEqual/index.js'

declare module '../../expect.js' {
  interface Matchers {
    // TODO: mention `expect(...).toHaveProperty(key, value?)
    /**
     * Matches objects for which a given key exists. Optionally checks the
     * property value.
     *
     * @param key - The expected property key.
     * @param value - (optional) The expected property value.
     *
     * @example
     * ```ts
     * const events = await getLatestEvents({ limit: 3 })
     * expect(events).toEqual([
     *   expect.property('pending', true),
     *   expect.property('finalizedAt'),
     *   expect.property('finalizedAt'),
     * ])
     * ```
     */
    property(key: string, value?: unknown): never
  }
}

registerMatcher('property', property)

export function property(key: string, expected?: unknown) {
  const hasValue = arguments.length >= 2
  return (value: unknown) => {
    if (typeof value !== 'object' || value === null) {
      return false
    }
    if (!Reflect.has(value, key)) {
      return false
    }
    return !hasValue || isEqual(Reflect.get(value, key), expected)
  }
}
