import { assert } from 'console'

export interface MockCall {
  args: any[]
  result: { type: 'return'; value: any } | { type: 'throw'; error: any }
}

export interface LooseMock<ARGS extends any[], RETURN> {
  /** Calls the mock function */
  (...args: ARGS): RETURN
  calls: MockCall[]
}

export function looseMockFn<RETURN = any>(defaultImplementation: (...args: any[]) => RETURN): LooseMock<any, RETURN> {
  assert(defaultImplementation, 'Loose mocks need to have default implementation')

  function mock(...args: any[]): RETURN {
    try {
      const returnValue = defaultImplementation(...args)
      mock.calls.push({ args, result: { type: 'return', value: returnValue } })
      return returnValue
    } catch (e) {
      mock.calls.push({ args, result: { type: 'throw', error: e } })
      throw e
    }
  }
  mock.calls = [] as MockCall[]

  return mock
}
