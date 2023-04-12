import { Control } from './Control.js'
import { formatCompact } from './format/index.js'

// to be overridden by plugins
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Validators<T> {}

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

class Expectation {
  private _negated = false
  constructor(private readonly _value: unknown) {}

  get not() {
    if (this._negated) {
      throw new TypeError('Cannot apply .not modifier twice.')
    }
    this._negated = true
    return this
  }

  protected _getControl(name: string) {
    const functionName = this._negated
      ? `expect().not.${name}`
      : `expect().${name}`
    return new Control({
      name: functionName,
      actual: this._value,
      isNegated: this._negated,
    })
  }
}

export function registerValidator(
  name: string,
  validator: (control: Control, ...args: any[]) => any,
) {
  function execute(this: Expectation, ...args: any[]) {
    return validator(this._getControl(name), ...args)
  }
  Object.defineProperty(execute, 'name', { value: name, writable: false })
  Reflect.set(Expectation.prototype, name, execute)
}

type ValidatorsAndModifiers<T> = Validators<T> & {
  /**
   * Negates the following assertion.
   */
  not: Validators<T>
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
