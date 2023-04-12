import { isMockFn, mockFn } from './mockFn.js'
import { MockFunctionOf } from './types/index.js'

export type MockObject<T> = T & {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? MockFunctionOf<T[P]>
    : T[P]
}

/**
 * Returns a mock object that can be used in place of a real object. This is
 * useful if the real object is hard to create or if it is hard to get it
 * exhibit some specific behavior.
 *
 * Functions on the mock object are also `mockFn`s, so they can be used in
 * validators that work for mocks.
 *
 * @param overrides - The members to be overridden.
 *
 * @example
 * ```ts
 * class Person {
 *   constructor(public name: string, public age: number) {}
 *
 *   isAdult() {
 *     return this.age >= 18
 *   }
 * }
 *
 * const mock = mockObject<Person>({
 *   isAdult: () => true,
 * })
 *
 * expect(mock.isAdult()).toEqual(true)
 * expect(mock.isAdult).toHaveBeenCalled()
 * ```
 */
export function mockObject<T>(overrides: Partial<T> = {}): MockObject<T> {
  const clone = replaceFunctionsWithMocks(overrides)

  return new Proxy(clone as MockObject<T>, {
    get(target, property, receiver) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property, receiver)
      }
      throw new TypeError(
        `Cannot access .${property.toString()} - no mock value provided.`,
      )
    },
  })
}

function replaceFunctionsWithMocks<T extends object>(object: T) {
  const clone = { ...object }
  for (const key of Object.keys(clone) as (keyof T)[]) {
    const value = clone[key]
    if (typeof value === 'function') {
      if (!isMockFn(value)) {
        clone[key] = mockFn(value as any) as any
      }
    }
  }
  return clone
}
