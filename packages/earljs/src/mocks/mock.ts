import { isMock, mockFn } from './mockFn'
import { MockOf } from './types'

export type MockedObject<T> = T & {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? MockOf<T[P]> : T[P]
}

export function mock<T>(overrides: Partial<T> = {}): MockedObject<T> {
  const clone = replaceFunctionsWithMocks(overrides)

  return new Proxy(clone as MockedObject<T>, {
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
      if (!isMock(value)) {
        clone[key] = mockFn(value as any) as any
      }
    }
  }
  return clone
}
