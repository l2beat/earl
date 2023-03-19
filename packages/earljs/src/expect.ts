import { Control } from './Control'
import { formatCompact } from './format'

// to be overridden by plugins
export interface Validators<T, R> {
  readonly value: T
}

// to be overridden by plugins
export interface SyncOnlyValidators {}

// to be overridden by plugins
export interface Matchers {}

export class Matcher {
  constructor(
    readonly representation: string,
    readonly check: (v: unknown) => boolean,
  ) {}
  toString() {
    return this.representation
  }
}

class Expectation<T> {
  _negated = false
  _async = false
  constructor(public readonly value: T) {}

  get not() {
    if (this._negated) {
      throw new TypeError('Cannot apply .not modifier twice.')
    }
    this._negated = true
    return this
  }

  get async() {
    if (this._negated) {
      throw new TypeError('Cannot call .not.async, use .async.not instead.')
    }
    if (this._async) {
      throw new TypeError('Cannot apply .async modifier twice.')
    }
    this._async = true
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

type AsyncValidators<T> = Omit<
  Validators<Awaited<T>, Promise<void>>,
  keyof SyncOnlyValidators
>

type ValidatorsAndModifiers<T> = Validators<T, void> & {
  not: Validators<T, void>
  async: AsyncValidators<T> & {
    not: AsyncValidators<T>
  }
}

const rawExpect = function expect<T>(value: T): ValidatorsAndModifiers<T> {
  return new Expectation(value) as any
}

const matchers: Record<string, (...args: any[]) => Matcher> =
  Object.create(null)

export function registerMatcher<A extends any[]>(
  name: string,
  check: (...args: A) => (value: unknown) => boolean,
  format?: (...args: A) => string,
) {
  Reflect.set(matchers, name, (...args: A) => {
    const representation = format
      ? format(...args)
      : `${name}(${args.map((x) => formatCompact(x)).join(', ')})`
    return new Matcher(representation, check(...args))
  })
}

export const expect = new Proxy(rawExpect, {
  get(target, name) {
    // we need this, because otherwise we cannot override length
    return Reflect.get(matchers, name) ?? Reflect.get(target, name)
  },
}) as typeof rawExpect & Matchers
