import { AutofixType } from './autofix'
import { toEqual } from './matchers/toEqual'

export interface InternalExpectation<T> {
  readonly autofix: AutofixType
  readonly actual: T
}

export class Expectation<T> {
  constructor(private readonly autofix: AutofixType, private readonly actual: T) {}

  toEqual = toEqual
}
