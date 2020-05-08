import { toEqual } from './matchers/toEqual'

export interface InternalExpectation<T> {
  readonly autofix: (_oldValue: any, newValue: any) => void
  readonly actual: T
}

export class Expectation<T> {
  constructor(private readonly autofix: (_oldValue: any, newValue: any) => void, private readonly actual: T) {}

  toEqual = toEqual
}
