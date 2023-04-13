import { registerMatcher } from '../../expect.js'
import { isEqual } from '../../isEqual/index.js'

export type Subset = Record<string | number | symbol, unknown>

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches an object containing the given key value pairs.
     *
     * If you want to match a top level value, use
     * `expect(...).toHaveSubset(subset)` instead.
     *
     * @param subset - The key value paris to match against.
     *
     * @example
     * ```ts
     * const response = await api.get('/users/me')
     * expect(response).toEqual({
     *   success: true,
     *   data: expect.subset({
     *     name: 'John Doe',
     *     age: 42,
     *   }),
     * })
     * ```
     */
    subset(subset: Subset): never
  }
}

registerMatcher('subset', subset)

export function subset(subset: unknown) {
  if (!isObject(subset)) {
    return () => false
  }

  return (value: unknown) => {
    if (!isObject(value)) {
      return false
    }
    return Object.entries(subset).every(([key, expected]) =>
      isEqual(value[key], expected),
    )
  }
}

function isObject(value: unknown): value is Subset {
  return (
    value != null && (typeof value === 'object' || typeof value === 'function')
  )
}
