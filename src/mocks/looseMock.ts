import { assert } from 'console'

export interface LooseMock<ARGS extends any[], RETURN> {
  /** Calls the mock function */
  (...args: ARGS): RETURN
  calls: ARGS[]
}

export function looseMockFn<RETURN = any>(defaultImplementation: (...args: any[]) => RETURN): LooseMock<any, RETURN> {
  assert(defaultImplementation, 'Loose mocks need to have default implementation')

  function mock(...args: any[]): RETURN {
    try {
      const returnValue = defaultImplementation(...args)
      mock.calls.push(args)
      return returnValue
    } catch (e) {
      mock.calls.push(args)
      throw e
    }
  }
  mock.calls = [] as any[]

  return mock
}
