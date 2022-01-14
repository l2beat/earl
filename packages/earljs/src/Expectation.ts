import { Control } from './Control'
import { ExpectedEqual } from './isEqual/rules'
import { AnythingMatcher } from './matchers/Anything'
import { ErrorMatcher } from './matchers/Error'
import { MockArgs } from './mocks'
import { Modifiers } from './Modifiers'
import { DynamicValidator } from './plugins/types'
import { Newable } from './types'
import { toBeFalsy, toBeTruthy } from './validators/booleans'
import { toBeAContainerWith, toBeAnArrayOfLength, toBeAnArrayWith, toBeAnObjectWith } from './validators/dataStructures'
import { toBeExhausted, toHaveBeenCalledExactlyWith, toHaveBeenCalledWith } from './validators/mocks'
import { toBeGreaterThan, toBeGreaterThanOrEqualTo, toBeLessThan, toBeLessThanOrEqualTo } from './validators/numbers'
import { toBeDefined, toBeNullish } from './validators/optionals'
import { toMatchSnapshot } from './validators/snapshots/toMatchSnapshot'
import { toBeA } from './validators/toBeA'
import { toBeRejected } from './validators/toBeRejected'
import { toEqual } from './validators/toEqual'
import { toLooseEqual } from './validators/toLooseEqual'
import { toReferentiallyEqual } from './validators/toReferentiallyEqual'
import { toThrow } from './validators/toThrow'
import { ValidatorsFor } from './validators/types'

export interface ExpectationOptions {
  extraMessage?: string
}

export type Expectation<T> = Modifiers<T> & ValidatorsFor<T>

/**
 * @internal
 */
export class __ExpectationImplementation<T> implements Modifiers<T> {
  private constructor(
    private readonly actual: T,
    private readonly isNegated: boolean = false,
    private readonly options: ExpectationOptions = {},
  ) {
    for (const [name, validator] of Object.entries(dynamicValidators)) {
      ;(this as any)[name] = validator
    }
  }

  static make<T>(actual: T, isNegated: boolean = false, options: ExpectationOptions = {}): Expectation<T> {
    const instance = new __ExpectationImplementation(actual, isNegated, options)
    return instance as unknown as Expectation<T>
  }

  // modifiers

  get not(): Expectation<T> {
    if (this.isNegated) {
      throw new Error('Tried negating an already negated expectation')
    }

    return new __ExpectationImplementation(this.actual, true, this.options) as unknown as Expectation<T>
  }

  toEqual(value: ExpectedEqual<T>): void {
    toEqual(this.getControl(), value)
  }

  toLooseEqual(value: any): void {
    toLooseEqual(this.getControl(), value)
  }

  toReferentiallyEqual(value: number): void {
    toReferentiallyEqual(this.getControl(), value as any)
  }

  toThrow(): void
  toThrow(message: string): void
  toThrow(errorClass: Newable<Error>, message?: string): void
  toThrow(classOrMessage?: string | Newable<Error>, message?: string): void {
    if (arguments.length === 0) {
      toThrow(this.getControl(), AnythingMatcher.make())
    } else {
      toThrow(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  toBeRejected(): Promise<void>
  toBeRejected(message: string): Promise<void>
  toBeRejected(errorClass: Newable<Error>, message?: string): Promise<void>
  toBeRejected(classOrMessage?: string | Newable<Error>, message?: string): Promise<void> {
    if (arguments.length === 0) {
      return toBeRejected(this.getControl(), AnythingMatcher.make())
    } else {
      return toBeRejected(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  toBeA(clazz: any) {
    return toBeA(this.getControl(), clazz)
  }

  toBeAContainerWith(...expectedItems: any[]) {
    return toBeAContainerWith(this.getControl(), expectedItems)
  }

  toBeAnArrayOfLength(length: number) {
    return toBeAnArrayOfLength(this.getControl(), length)
  }

  toBeAnArrayWith(...expectedItems: ReadonlyArray<any>) {
    return toBeAnArrayWith(this.getControl(), expectedItems)
  }

  toBeAnObjectWith(subset: Object) {
    return toBeAnObjectWith(this.getControl(), subset)
  }

  toBeGreaterThan(target: number) {
    return toBeGreaterThan(this.getControl(), target)
  }

  toBeGreaterThanOrEqualTo(target: number) {
    return toBeGreaterThanOrEqualTo(this.getControl(), target)
  }

  toBeLessThan(target: number) {
    return toBeLessThan(this.getControl(), target)
  }

  toBeLessThanOrEqualTo(target: number) {
    return toBeLessThanOrEqualTo(this.getControl(), target)
  }

  toBeTruthy() {
    return toBeTruthy(this.getControl())
  }
  toBeFalsy() {
    return toBeFalsy(this.getControl())
  }

  toBeDefined() {
    return toBeDefined(this.getControl())
  }
  toBeNullish() {
    return toBeNullish(this.getControl())
  }

  toBeExhausted() {
    return toBeExhausted(this.getControl())
  }

  toHaveBeenCalledWith(args: MockArgs<T>) {
    return toHaveBeenCalledWith(this.getControl(), args)
  }

  toHaveBeenCalledExactlyWith(args: MockArgs<T>[]) {
    return toHaveBeenCalledExactlyWith(this.getControl(), args)
  }

  toMatchSnapshot(): void {
    toMatchSnapshot(this.getControl())
  }

  // utilities

  private getControl(): Control<any> {
    return new Control(this.actual, this.isNegated, this.options.extraMessage)
  }
}

const dynamicValidators: Record<string, DynamicValidator<any>> = {}
export function loadValidators(validators: Record<string, DynamicValidator<any>>) {
  for (const [name, validator] of Object.entries(validators)) {
    dynamicValidators[name] = validator
  }
}

export function getControl<T>(expectation: Expectation<T>): Control<T> {
  return (expectation as unknown as __ExpectationImplementation<T>)['getControl']()
}
