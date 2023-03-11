import { Control } from './Control'

// to be overridden by plugins
export interface Validators<T> {
  readonly value: T
}

// to be overridden by plugins
export interface Matchers {}

export abstract class Matcher {
  abstract check(v: unknown): boolean
  abstract toString(): string
}

class Expectation<T> {
  _negated = false
  constructor(public readonly value: T) {}

  get not() {
    this._negated = !this._negated
    return this
  }

  _getControl() {
    return new Control(this.value, this._negated)
  }
}

export function registerValidator(
  name: string,
  validator: (control: Control<any>, ...args: any[]) => any,
) {
  Reflect.set(
    Expectation.prototype,
    name,
    function (this: Expectation<any>, ...args: any[]) {
      return validator(this._getControl(), ...args)
    },
  )
}

const rawExpect = function expect<T>(
  value: T,
): Validators<T> & { not: Validators<T> } {
  return new Expectation(value) as any
}

export function registerMatcher(
  name: string,
  build: (...args: any[]) => Matcher,
) {
  Reflect.set(rawExpect, name, build)
}

export const expect = rawExpect as typeof rawExpect & Matchers
