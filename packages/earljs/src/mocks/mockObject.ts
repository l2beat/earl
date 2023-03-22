import { isMockFn, mockFn } from './mockFn'
import { MockFunctionOf } from './types'

export type MockObject<T> = T & {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? MockFunctionOf<T[P]>
    : T[P]
}

export function mockObject<T>(overrides: Partial<T> = {}): MockObject<T> {
  const clone = replaceFunctionsWithMocks(overrides)

  return new Proxy(clone as MockObject<T>, {
    get(target, property, receiver) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property, receiver)
      }
      return new Proxy(function () {}, {
        apply: () => {
          throw new TypeError(
            `Cannot call .${property.toString()}() - no mock implementation provided.`,
          )
        },
        get: (_, key) => {
          throw new TypeError(
            `Cannot access .${property.toString()}.${key.toString()} - no mock value provided.`,
          )
        },
      })
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
