---
id: api-reference
hide_title: true
title: API Reference
---

## Synopsis

### Validators

- [`not(): Expectation<T>`](#not---expectationt)
- [`toBeA(clazz: any): void`](#tobea-clazz-any--void)
- [`toBeAContainerWith(...expectedItems: any[]): void`](#tobeacontainerwith-expecteditems-any--void)
- [`toBeAnArrayOfLength(length: number): void`](#tobeanarrayoflength-length-number--void)
- [`toBeAnArrayWith(...expectedItems: ReadonlyArray<any>): void`](#tobeanarraywith-expecteditems-readonlyarrayany--void)
- [`toBeAnObjectWith(subset: Object): void`](#tobeanobjectwith-subset-object--void)
- [`toBeExhausted(): void`](#tobeexhausted---void)
- [`toBeGreaterThan(target: number): void`](#tobegreaterthan-target-number--void)
- [`toBeGreaterThanOrEqualTo(target: number): void`](#tobegreaterthanorequalto-target-number--void)
- [`toBeLessThan(target: number): void`](#tobelessthan-target-number--void)
- [`toBeLessThanOrEqualTo(target: number): void`](#tobelessthanorequalto-target-number--void)
- [`toBeRejected(): Promise<void>`](#toberejected---promisevoid)
- [`toBeRejected(errorClass: Newable<Error>, message?: string): Promise<void>`](#toberejected-errorclass-newableerror-message-string--promisevoid)
- [`toBeRejected(message: string): Promise<void>`](#toberejected-message-string--promisevoid)
- [`toEqual(value: T): void`](#toequal-value-t--void)
- [`toHaveBeenCalledExactlyWith(args: MockArgs<T>[]): void`](#tohavebeencalledexactlywith-args-mockargst--void)
- [`toHaveBeenCalledWith(args: MockArgs<T>): void`](#tohavebeencalledwith-args-mockargst--void)
- [`toLooseEqual(value: any): void`](#tolooseequal-value-any--void)
- [`toMatchSnapshot(): void`](#tomatchsnapshot---void)
- [`toReferentiallyEqual(value: T): void`](#toreferentiallyequal-value-t--void)
- [`toThrow(): void`](#tothrow---void)
- [`toThrow(errorClass: Newable<Error>, message?: string): void`](#tothrow-errorclass-newableerror-message-string--void)
- [`toThrow(message: string): void`](#tothrow-message-string--void)

### Matchers

- [`a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`](#at-type-newableorprimitivet--class2primitivet)
- [`anything(): any`](#anything---any)
- [`arrayOfLength<T>(length: number): T[]`](#arrayoflengtht-length-number--t)
- [`arrayWith<T>(...items: T[]): T[]`](#arraywitht-items-t--t)
- [`containerWith(...items: any[]): any`](#containerwith-items-any--any)
- [`numberCloseTo(target: number, options:`](#numbercloseto-target-number-options-)
- [`numberGreaterThan(target: number): number`](#numbergreaterthan-target-number--number)
- [`numberGreaterThanOrEqualTo(target: number): number`](#numbergreaterthanorequalto-target-number--number)
- [`numberLessThan(target: number): number`](#numberlessthan-target-number--number)
- [`numberLessThanOrEqualTo(target: number): number`](#numberlessthanorequalto-target-number--number)
- [`objectWith(subset: Object): any`](#objectwith-subset-object--any)
- [`stringMatching(pattern: RegExp): string`](#stringmatching-pattern-regexp--string)
- [`stringMatching(substring: string): string`](#stringmatching-substring-string--string)

### Mocks

- [`(...args: ARGS): RETURN`](#-args-args--return)
- [`calls: MockCall<ARGS, RETURN>[]`](#calls-mockcallargs-return)
- [`executes(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`](#executes-implementation--args-args-return--mockargs-return)
- [`executesOnce(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`](#executesonce-implementation--args-args-return--mockargs-return)
- [`executesOnce(implementation: (...args: B) => RETURN): Mock<ARGS, RETURN>`](#executesonce-implementation--args-b-return--mockargs-return)
- [`given<B extends ARGS>(...args: B):`](#givenbextendsargs-args-b--)
- [`isExhausted(): boolean`](#isexhausted---boolean)
- [`rejectsWith(error: any): Mock<ARGS, RETURN>`](#rejectswith-error-any--mockargs-return)
- [`rejectsWithOnce(error: any): Mock<ARGS, RETURN>`](#rejectswithonce-error-any--mockargs-return)
- [`rejectsWithOnce(error: any): Mock<ARGS, any>`](#rejectswithonce-error-any--mockargs-any)
- [`resolvesTo(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvesto-value-awaitedreturn--mockargs-return)
- [`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvestoonce-value-awaitedreturn--mockargs-return)
- [`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvestoonce-value-awaitedreturn--mockargs-return)
- [`returns(value: RETURN): Mock<ARGS, RETURN>`](#returns-value-return--mockargs-return)
- [`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`](#returnsonce-value-return--mockargs-return)
- [`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`](#returnsonce-value-return--mockargs-return)
- [`throws(error: any): Mock<ARGS, RETURN>`](#throws-error-any--mockargs-return)
- [`throwsOnce(error: any): Mock<ARGS, RETURN>`](#throwsonce-error-any--mockargs-return)
- [`throwsOnce(error: any): Mock<ARGS, RETURN>`](#throwsonce-error-any--mockargs-return)

## Reference

### Validators

#### **`not(): Expectation<T>`** {#not---expectationt}

* Inverts the behaviour of the validator that follows.
  
#### **`toBeA(this: Expectation<T>, clazz: any): void`** {#tobea-clazz-any--void}

* Checks if the value is an instance of the provided class or primitive type. Examples:

1. `expect(object).toBeA(MyClass)` - checks if object is instance of `MyClass`, but not `Other`
2. `expect(foo).toBeA(String)` - checks if foo is instance of string
  
*Parameters:*

- `clazz` - type class or primitive constructor to match against.
  
#### **`toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]): void`** {#tobeacontainerwith-expecteditems-any--void}

* Checks if the value is an iterable containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
  
#### **`toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number): void`** {#tobeanarrayoflength-length-number--void}

* Checks if the values is an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>): void`** {#tobeanarraywith-expecteditems-readonlyarrayany--void}

* Checks if the value is an array containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched array. Order of the items doesn't matter.
  
#### **`toBeAnObjectWith(this: Expectation<Object>, subset: Object): void`** {#tobeanobjectwith-subset-object--void}

* Checks if the value is an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`toBeExhausted(this: Expectation<Mock<any, any>>): void`** {#tobeexhausted---void}

* Checks if all the expected calls to the mock have been performed.
  
#### **`toBeGreaterThan(this: Expectation<number>, target: number): void`** {#tobegreaterthan-target-number--void}

* Checks if the value is greater than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number): void`** {#tobegreaterthanorequalto-target-number--void}

* Checks if the value is greater than or equal to the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThan(this: Expectation<number>, target: number): void`** {#tobelessthan-target-number--void}

* Checks if the value is less than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThanOrEqualTo(this: Expectation<number>, target: number): void`** {#tobelessthanorequalto-target-number--void}

* Checks if the value is less than or equal the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>): Promise<void>`** {#toberejected---promisevoid}

* Awaits the provided promise and expects it to be rejected.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>`** {#toberejected-errorclass-newableerror-message-string--promisevoid}

* Awaits the provided promise and expects it to be rejected. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>`** {#toberejected-message-string--promisevoid}

* Awaits the provided promise and expects it to be rejected. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  
#### **`toEqual(value: T): void`** {#toequal-value-t--void}

* Performs a recursive equality check. Objects are equal if their fields
are equal and they share the same prototype.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
*Examples:*

Equality check against primitive value
```ts
expect('foo').toEqual('foo')
```
Usage with "a" matcher
```ts
expect([1, { a: 2 }]).toEqual([1, { a: expect.a(Number) }])
```
Negated equality check
```ts
expect({ a: 2, b: 2 }).not.toEqual({ a: 2 })
```
  
#### **`toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]): void`** {#tohavebeencalledexactlywith-args-mockargst--void}

* Checks the entire history of mock calls.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array where each item is an array of values or matchers to check the mock call against.
  
#### **`toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>): void`** {#tohavebeencalledwith-args-mockargst--void}

* Check if the mock has been called with the provided arguments.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array of values or matchers to check the mock calls against.
  
#### **`toLooseEqual(value: any): void`** {#tolooseequal-value-any--void}

* Performs a recursive equality check. Objects are equal if their fields
are equal. Object prototypes are ignored.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toMatchSnapshot(this: Expectation<any>): void`** {#tomatchsnapshot---void}

* Checks that the value is the same as in the previous test execution.
  
#### **`toReferentiallyEqual(this: Expectation<T>, value: T): void`** {#toreferentiallyequal-value-t--void}

* Performs a referential equality check using `Object.is`. It is similar to
`===`, with two differences:

1. `Object.is(-0, +0)` returns `false`
2. `Object.is(NaN, NaN)` returns `true`

This function should be used if you care about object identity rather than
deep equality.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toThrow(this: Expectation<() => any>): void`** {#tothrow---void}

* Calls the provided function and expects an error to be thrown.
  
#### **`toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void`** {#tothrow-errorclass-newableerror-message-string--void}

* Calls the provided function and expects an error to be thrown. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toThrow(this: Expectation<() => any>, message: string): void`** {#tothrow-message-string--void}

* Calls the provided function and expects an error to be thrown. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  

### Matchers

#### **`a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`** {#at-type-newableorprimitivet--class2primitivet}

* Matches an instance of the provided class or primitive type. Examples:

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`
  
*Parameters:*

- `type` - class or primitive constructor to match against.
  
#### **`anything(): any`** {#anything---any}

* Matches any value.
  
#### **`arrayOfLength<T>(length: number): T[]`** {#arrayoflengtht-length-number--t}

* Matches an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`arrayWith<T>(...items: T[]): T[]`** {#arraywitht-items-t--t}

* Matches an array containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched array.
  
#### **`containerWith(...items: any[]): any`** {#containerwith-items-any--any}

* Matches an iterable containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched iterable.
  
#### **`numberCloseTo(target: number, options:`** {#numbercloseto-target-number-options-}

* Matches numbers that are close to the target value. The options are used
to specify the maximum difference.

The range is [expected - delta, expected + delta] (inclusive).
  
*Parameters:*

- `target` - a number to aim for.
- `options` - an object with the delta parameter, denoting the maximum difference between the values.
  
#### **`numberGreaterThan(target: number): number`** {#numbergreaterthan-target-number--number}

* Matches a number greater than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberGreaterThanOrEqualTo(target: number): number`** {#numbergreaterthanorequalto-target-number--number}

* Matches a number greater than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThan(target: number): number`** {#numberlessthan-target-number--number}

* Matches a number less than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThanOrEqualTo(target: number): number`** {#numberlessthanorequalto-target-number--number}

* Matches a number less than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`objectWith(subset: Object): any`** {#objectwith-subset-object--any}

* Matches an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`stringMatching(pattern: RegExp): string`** {#stringmatching-pattern-regexp--string}

* Matches strings that conform to the provided pattern.
  
*Parameters:*

- `pattern` - a regexp to test the matched values.
  
#### **`stringMatching(substring: string): string`** {#stringmatching-substring-string--string}

* Matches strings that contain the provided substring.
  
*Parameters:*

- `substring` - a string to look for in the matched values.
  

### Mocks

#### **`(...args: ARGS): RETURN`** {#-args-args--return}

* Calls the mock function.
  
#### **`calls: MockCall<ARGS, RETURN>[]`** {#calls-mockcallargs-return}

* An array containing all the performed calls.
  
#### **`executes(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`** {#executes-implementation--args-args-return--mockargs-return}

* Sets the underlying implementation of the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`** {#executesonce-implementation--args-args-return--mockargs-return}

* Schedules the mock to use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: B) => RETURN): Mock<ARGS, RETURN>`** {#executesonce-implementation--args-b-return--mockargs-return}

* Schedules the mock use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`given<B extends ARGS>(...args: B):`** {#givenbextendsargs-args-b--}

* Specifies a different behavior when other arguments are given
  
*Parameters:*

- `args` - arguments to match
  
#### **`isExhausted(): boolean`** {#isexhausted---boolean}

* Checks if all the expected calls to the mock have been performed.
  
#### **`rejectsWith(error: any): Mock<ARGS, RETURN>`** {#rejectswith-error-any--mockargs-return}

* Sets the error rejected by calls to the Mock.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<ARGS, RETURN>`** {#rejectswithonce-error-any--mockargs-return}

* Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<ARGS, any>`** {#rejectswithonce-error-any--mockargs-any}

* Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`resolvesTo(value: Awaited<RETURN>): Mock<ARGS, RETURN>`** {#resolvesto-value-awaitedreturn--mockargs-return}

* Sets the return value wrapped in Promise.resolve of calls to the Mock.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`** {#resolvestoonce-value-awaitedreturn--mockargs-return}

* Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`** {#resolvestoonce-value-awaitedreturn--mockargs-return}

* Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returns(value: RETURN): Mock<ARGS, RETURN>`** {#returns-value-return--mockargs-return}

* Sets the return value of calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`** {#returnsonce-value-return--mockargs-return}

* Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`** {#returnsonce-value-return--mockargs-return}

* Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`throws(error: any): Mock<ARGS, RETURN>`** {#throws-error-any--mockargs-return}

* Sets the error thrown by calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<ARGS, RETURN>`** {#throwsonce-error-any--mockargs-return}

* Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<ARGS, RETURN>`** {#throwsonce-error-any--mockargs-return}

* Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  