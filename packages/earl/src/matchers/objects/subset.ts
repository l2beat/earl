import { registerMatcher } from '../../expect'
import { isEqual } from '../../isEqual'

declare module '../../expect' {
  interface Matchers {
    // TODO: mention `expect(...).toHaveSubset(subset)
    /**
     * Matches an object containing the given key value pairs.
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
    subset(subset: object): never
  }
}

registerMatcher('subset', subset)

export function subset(subset: Record<string, unknown>) {
  return (value: unknown) => {
    if (!isObject(value)) {
      return false
    }
    return Object.entries(subset).every(([key, expected]) =>
      isEqual(value[key], expected),
    )
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value != null && (typeof value === 'object' || typeof value === 'function')
  )
}
