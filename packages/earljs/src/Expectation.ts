import { Control } from './Control'
import { AnythingMatcher } from './matchers/Anything'
import { ErrorMatcher } from './matchers/Error'
import { Mock, MockArgs } from './mocks'
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
import { Validators } from './validators/types'

export interface ExpectationOptions {
  extraMessage?: string
}

export class Expectation<T> implements Modifiers<T>, Validators<T> {
  constructor(
    private readonly actual: T,
    private readonly isNegated: boolean = false,
    private readonly options: ExpectationOptions = {},
  ) {
    for (const [name, validator] of Object.entries(dynamicValidators)) {
      ;(this as any)[name] = validator
    }
  }

  // modifiers

  get not(): Expectation<T> {
    if (this.isNegated) {
      throw new Error('Tried negating an already negated expectation')
    }

    return new Expectation(this.actual, true, this.options)
  }

  toEqual(value: T): void {
    toEqual(this.getControl(), value)
  }

  toLooseEqual(value: any): void {
    toLooseEqual(this.getControl(), value)
  }

  toReferentiallyEqual(this: Expectation<T>, value: T): void {
    toReferentiallyEqual(this.getControl(), value as any)
  }

  toThrow(this: Expectation<() => any>): void
  toThrow(this: Expectation<() => any>, message: string): void
  toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void
  toThrow(this: Expectation<() => any>, classOrMessage?: string | Newable<Error>, message?: string): void {
    if (arguments.length === 0) {
      toThrow(this.getControl(), AnythingMatcher.make())
    } else {
      toThrow(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  toBeRejected(this: Expectation<Promise<any>>): Promise<void>
  toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>
  toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>
  toBeRejected(
    this: Expectation<Promise<any>>,
    classOrMessage?: string | Newable<Error>,
    message?: string,
  ): Promise<void> {
    if (arguments.length === 0) {
      return toBeRejected(this.getControl(), AnythingMatcher.make())
    } else {
      return toBeRejected(this.getControl(), ErrorMatcher.make(classOrMessage as any, message))
    }
  }

  toBeA(this: Expectation<T>, clazz: any) {
    return toBeA(this.getControl(), clazz)
  }

  toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]) {
    return toBeAContainerWith(this.getControl(), expectedItems)
  }

  toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number) {
    return toBeAnArrayOfLength(this.getControl(), length)
  }

  toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>) {
    return toBeAnArrayWith(this.getControl(), expectedItems)
  }

  toBeAnObjectWith(this: Expectation<Object>, subset: Object) {
    return toBeAnObjectWith(this.getControl(), subset)
  }

  toBeGreaterThan(this: Expectation<number>, target: number) {
    return toBeGreaterThan(this.getControl(), target)
  }

  toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number) {
    return toBeGreaterThanOrEqualTo(this.getControl(), target)
  }

  toBeLessThan(this: Expectation<number>, target: number) {
    return toBeLessThan(this.getControl(), target)
  }

  toBeLessThanOrEqualTo(this: Expectation<number>, target: number) {
    return toBeLessThanOrEqualTo(this.getControl(), target)
  }

  toBeTruthy(this: Expectation<unknown>) {
    return toBeTruthy(this.getControl())
  }
  toBeFalsy(this: Expectation<unknown>) {
    return toBeFalsy(this.getControl())
  }

  toBeDefined(this: Expectation<unknown>) {
    return toBeDefined(this.getControl())
  }
  toBeNullish(this: Expectation<unknown>) {
    return toBeNullish(this.getControl())
  }

  toBeExhausted(this: Expectation<Mock<any, any>>) {
    return toBeExhausted(this.getControl())
  }

  toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>) {
    return toHaveBeenCalledWith(this.getControl(), args)
  }

  toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]) {
    return toHaveBeenCalledExactlyWith(this.getControl(), args)
  }

  toMatchSnapshot(this: Expectation<any>): void {
    toMatchSnapshot(this.getControl())
  }

  // utilities

  private getControl(): Control<T> {
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
  return expectation['getControl']()
}
