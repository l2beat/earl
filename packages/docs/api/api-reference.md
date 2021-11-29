---
id: api-reference
hide_title: true
title: API Reference
---
## Synopsis

### Validators

- [`not()`](#not-)
- [`toBeA(clazz: any)`](#toBeA-clazz-any)
- [`toBeAContainerWith(...expectedItems: any[])`](#toBeAContainerWith-expectedItems-any)
- [`toBeAnArrayOfLength(length: number)`](#toBeAnArrayOfLength-length-number)
- [`toBeAnArrayWith(...expectedItems: ReadonlyArray<any>)`](#toBeAnArrayWith-expectedItems-ReadonlyArrayany)
- [`toBeAnObjectWith(subset: Object)`](#toBeAnObjectWith-subset-Object)
- [`toBeExhausted()`](#toBeExhausted-)
- [`toBeGreaterThan(target: number)`](#toBeGreaterThan-target-number)
- [`toBeGreaterThanOrEqualTo(target: number)`](#toBeGreaterThanOrEqualTo-target-number)
- [`toBeLessThan(target: number)`](#toBeLessThan-target-number)
- [`toBeLessThanOrEqualTo(target: number)`](#toBeLessThanOrEqualTo-target-number)
- [`toBeRejected()`](#toBeRejected-)
- [`toBeRejected(errorClass: Newable<Error>, message?: string)`](#toBeRejected-errorClass-NewableError-message-string)
- [`toBeRejected(message: string)`](#toBeRejected-message-string)
- [`toEqual(value: T)`](#toEqual-value-T)
- [`toHaveBeenCalledExactlyWith(args: MockArgs<T>[])`](#toHaveBeenCalledExactlyWith-args-MockArgsT)
- [`toHaveBeenCalledWith(args: MockArgs<T>)`](#toHaveBeenCalledWith-args-MockArgsT)
- [`toLooseEqual(value: any)`](#toLooseEqual-value-any)
- [`toMatchSnapshot()`](#toMatchSnapshot-)
- [`toReferentiallyEqual(value: T)`](#toReferentiallyEqual-value-T)
- [`toThrow()`](#toThrow-)
- [`toThrow(errorClass: Newable<Error>, message?: string)`](#toThrow-errorClass-NewableError-message-string)
- [`toThrow(message: string)`](#toThrow-message-string)

### Matchers

- [`a<T>(type: NewableOrPrimitive<T>)`](#aT-type-NewableOrPrimitiveT)
- [`anything()`](#anything-)
- [`arrayOfLength<T>(length: number)`](#arrayOfLengthT-length-number)
- [`arrayWith<T>(...items: T[])`](#arrayWithT-items-T)
- [`containerWith(...items: any[])`](#containerWith-items-any)
- [`numberCloseTo(target: number, options: NumberCloseToDelta)`](#numberCloseTo-target-number-options-NumberCloseToDelta)
- [`numberGreaterThan(target: number)`](#numberGreaterThan-target-number)
- [`numberGreaterThanOrEqualTo(target: number)`](#numberGreaterThanOrEqualTo-target-number)
- [`numberLessThan(target: number)`](#numberLessThan-target-number)
- [`numberLessThanOrEqualTo(target: number)`](#numberLessThanOrEqualTo-target-number)
- [`objectWith(subset: Object)`](#objectWith-subset-Object)
- [`stringMatching(pattern: RegExp)`](#stringMatching-pattern-RegExp)
- [`stringMatching(substring: string)`](#stringMatching-substring-string)

### Mocks

- [`(...args: TArgs)`](#-args-TArgs)
- [`calls`](#calls)
- [`executes(implementation: (...args: TArgs[]) => TReturn)`](#executes-implementation--args-TArgs-TReturn)
- [`executesOnce(implementation: (...args: TArgs[]) => TReturn)`](#executesOnce-implementation--args-TArgs-TReturn)
- [`executesOnce(implementation: (...args: TGivenArgs) => TReturn)`](#executesOnce-implementation--args-TGivenArgs-TReturn)
- [`function mockFn<F extends (...args: any) => any>(defaultImpl?: F)`](#functionmockFnFextends-args-any-any-defaultImpl-F)
- [`given<TGivenArgs extends TArgs>(...args: TGivenArgs)`](#givenTGivenArgsextendsTArgs-args-TGivenArgs)
- [`isExhausted()`](#isExhausted-)
- [`rejectsWith(error: any)`](#rejectsWith-error-any)
- [`rejectsWithOnce(error: any)`](#rejectsWithOnce-error-any)
- [`rejectsWithOnce(error: any)`](#rejectsWithOnce-error-any)
- [`resolvesTo(value: Awaited<TReturn>)`](#resolvesTo-value-AwaitedTReturn)
- [`resolvesToOnce(value: Awaited<TReturn>)`](#resolvesToOnce-value-AwaitedTReturn)
- [`resolvesToOnce(value: Awaited<TReturn>)`](#resolvesToOnce-value-AwaitedTReturn)
- [`returns(value: TReturn)`](#returns-value-TReturn)
- [`returnsOnce(value: TReturn)`](#returnsOnce-value-TReturn)
- [`returnsOnce(value: TReturn)`](#returnsOnce-value-TReturn)
- [`throws(error: any)`](#throws-error-any)
- [`throwsOnce(error: any)`](#throwsOnce-error-any)
- [`throwsOnce(error: any)`](#throwsOnce-error-any)

## Reference

### Validators

#### **`not(): Expectation<T>`** {#not-}

Inverts the behaviour of the validator that follows.
  
#### **`toBeA(this: Expectation<T>, clazz: any): void`** {#toBeA-clazz-any}

Checks if the value is an instance of the provided class or primitive type. Examples:

1. `expect(object).toBeA(MyClass)` - checks if object is instance of `MyClass`, but not `Other`
2. `expect(foo).toBeA(String)` - checks if foo is instance of string
  
*Parameters:*

- `clazz` - type class or primitive constructor to match against.
  
#### **`toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]): void`** {#toBeAContainerWith-expectedItems-any}

Checks if the value is an iterable containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
  
#### **`toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number): void`** {#toBeAnArrayOfLength-length-number}

Checks if the values is an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>): void`** {#toBeAnArrayWith-expectedItems-ReadonlyArrayany}

Checks if the value is an array containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched array. Order of the items doesn't matter.
  
#### **`toBeAnObjectWith(this: Expectation<Object>, subset: Object): void`** {#toBeAnObjectWith-subset-Object}

Checks if the value is an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`toBeExhausted(this: Expectation<Mock<any, any>>): void`** {#toBeExhausted-}

Checks if all the expected calls to the mock have been performed.
  
#### **`toBeGreaterThan(this: Expectation<number>, target: number): void`** {#toBeGreaterThan-target-number}

Checks if the value is greater than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number): void`** {#toBeGreaterThanOrEqualTo-target-number}

Checks if the value is greater than or equal to the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThan(this: Expectation<number>, target: number): void`** {#toBeLessThan-target-number}

Checks if the value is less than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThanOrEqualTo(this: Expectation<number>, target: number): void`** {#toBeLessThanOrEqualTo-target-number}

Checks if the value is less than or equal the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>): Promise<void>`** {#toBeRejected-}

Awaits the provided promise and expects it to be rejected.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>`** {#toBeRejected-errorClass-NewableError-message-string}

Awaits the provided promise and expects it to be rejected. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>`** {#toBeRejected-message-string}

Awaits the provided promise and expects it to be rejected. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  
#### **`toEqual(value: T): void`** {#toEqual-value-T}

Performs a recursive equality check. Objects are equal if their fields
are equal and they share the same prototype.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
*Examples:*


```ts
expect('foo').toEqual('foo') // Equality check against primitive value

expect([1, { a: 2 }]).toEqual([1, { a: expect.a(Number) }]) // Usage with "a" matcher

expect({ a: 2, b: 2 }).not.toEqual({ a: 2 }) // Negated equality check
```
#### **`toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]): void`** {#toHaveBeenCalledExactlyWith-args-MockArgsT}

Checks the entire history of mock calls.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array where each item is an array of values or matchers to check the mock call against.
  
#### **`toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>): void`** {#toHaveBeenCalledWith-args-MockArgsT}

Check if the mock has been called with the provided arguments.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array of values or matchers to check the mock calls against.
  
#### **`toLooseEqual(value: any): void`** {#toLooseEqual-value-any}

Performs a recursive equality check. Objects are equal if their fields
are equal. Object prototypes are ignored.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toMatchSnapshot(this: Expectation<any>): void`** {#toMatchSnapshot-}

Checks that the value is the same as in the previous test execution.
  
#### **`toReferentiallyEqual(this: Expectation<T>, value: T): void`** {#toReferentiallyEqual-value-T}

Performs a referential equality check using `Object.is`. It is similar to
`===`, with two differences:

1. `Object.is(-0, +0)` returns `false`
2. `Object.is(NaN, NaN)` returns `true`

This function should be used if you care about object identity rather than
deep equality.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toThrow(this: Expectation<() => any>): void`** {#toThrow-}

Calls the provided function and expects an error to be thrown.
  
#### **`toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void`** {#toThrow-errorClass-NewableError-message-string}

Calls the provided function and expects an error to be thrown. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toThrow(this: Expectation<() => any>, message: string): void`** {#toThrow-message-string}

Calls the provided function and expects an error to be thrown. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  

### Matchers

#### **`a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`** {#aT-type-NewableOrPrimitiveT}

Matches an instance of the provided class or primitive type. Examples:

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`
  
*Parameters:*

- `type` - class or primitive constructor to match against.
  
#### **`anything(): any`** {#anything-}

Matches any value.
  
#### **`arrayOfLength<T>(length: number): T[]`** {#arrayOfLengthT-length-number}

Matches an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`arrayWith<T>(...items: T[]): T[]`** {#arrayWithT-items-T}

Matches an array containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched array.
  
#### **`containerWith(...items: any[]): any`** {#containerWith-items-any}

Matches an iterable containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched iterable.
  
#### **`numberCloseTo(target: number, options: NumberCloseToDelta): number`** {#numberCloseTo-target-number-options-NumberCloseToDelta}

Matches numbers that are close to the target value. The options are used
to specify the maximum difference.

The range is [expected - delta, expected + delta] (inclusive).
  
*Parameters:*

- `target` - a number to aim for.
- `options` - an object with the delta parameter, denoting the maximum difference between the values.
  
#### **`numberGreaterThan(target: number): number`** {#numberGreaterThan-target-number}

Matches a number greater than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberGreaterThanOrEqualTo(target: number): number`** {#numberGreaterThanOrEqualTo-target-number}

Matches a number greater than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThan(target: number): number`** {#numberLessThan-target-number}

Matches a number less than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThanOrEqualTo(target: number): number`** {#numberLessThanOrEqualTo-target-number}

Matches a number less than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`objectWith(subset: Object): any`** {#objectWith-subset-Object}

Matches an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`stringMatching(pattern: RegExp): string`** {#stringMatching-pattern-RegExp}

Matches strings that conform to the provided pattern.
  
*Parameters:*

- `pattern` - a regexp to test the matched values.
  
#### **`stringMatching(substring: string): string`** {#stringMatching-substring-string}

Matches strings that contain the provided substring.
  
*Parameters:*

- `substring` - a string to look for in the matched values.
  

### Mocks

#### **`(...args: TArgs): TReturn`** {#-args-TArgs}

Calls the mock function.
  
#### **`calls: MockCall<TArgs, TReturn>[]`** {#calls}

An array containing all the performed calls.
  
#### **`executes(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>`** {#executes-implementation--args-TArgs-TReturn}

Sets the underlying implementation of the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>`** {#executesOnce-implementation--args-TArgs-TReturn}

Schedules the mock to use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: TGivenArgs) => TReturn): Mock<TArgs, TReturn>`** {#executesOnce-implementation--args-TGivenArgs-TReturn}

Schedules the mock use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`function mockFn<F extends (...args: any) => any>(defaultImpl?: F): Mock.Of<F>`** {#functionmockFnFextends-args-any-any-defaultImpl-F}

Creates a mock conforming to a given signature.
  
*Examples:*


```ts
const mock1 = mockFn<[number, string], number>()
const mock2 = mockFn<(a: number, b: string) => number>()
```
#### **`given<TGivenArgs extends TArgs>(...args: TGivenArgs): Mock.Given<TArgs, TReturn, TGivenArgs>`** {#givenTGivenArgsextendsTArgs-args-TGivenArgs}

Specifies a different behavior when other arguments are given
  
*Parameters:*

- `args` - arguments to match
  
#### **`isExhausted(): boolean`** {#isExhausted-}

Checks if all the expected calls to the mock have been performed.
  
#### **`rejectsWith(error: any): Mock<TArgs, TReturn>`** {#rejectsWith-error-any}

Sets the error rejected by calls to the Mock.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<TArgs, TReturn>`** {#rejectsWithOnce-error-any}

Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<TArgs, any>`** {#rejectsWithOnce-error-any}

Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`resolvesTo(value: Awaited<TReturn>): Mock<TArgs, TReturn>`** {#resolvesTo-value-AwaitedTReturn}

Sets the return value wrapped in Promise.resolve of calls to the Mock.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<TReturn>): Mock<TArgs, TReturn>`** {#resolvesToOnce-value-AwaitedTReturn}

Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<TReturn>): Mock<TArgs, TReturn>`** {#resolvesToOnce-value-AwaitedTReturn}

Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returns(value: TReturn): Mock<TArgs, TReturn>`** {#returns-value-TReturn}

Sets the return value of calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: TReturn): Mock<TArgs, TReturn>`** {#returnsOnce-value-TReturn}

Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: TReturn): Mock<TArgs, TReturn>`** {#returnsOnce-value-TReturn}

Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`throws(error: any): Mock<TArgs, TReturn>`** {#throws-error-any}

Sets the error thrown by calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<TArgs, TReturn>`** {#throwsOnce-error-any}

Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<TArgs, TReturn>`** {#throwsOnce-error-any}

Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  