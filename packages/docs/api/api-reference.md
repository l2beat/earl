---
id: api-reference
hide_title: true
title: API Reference
---

## Synopsis

### Validators

- [`not(): Expectation<T>`](#not-expectation<t>)
- [`toBeA(clazz: any): void`](#tobeathis-expectation<t>-clazz-any-void)
- [`toBeAContainerWith(...expectedItems: any[]): void`](#tobeacontainerwiththis-expectation<any>-...expecteditems-any[]-void)
- [`toBeAnArrayOfLength(length: number): void`](#tobeanarrayoflengththis-expectation<readonlyarray<any>>-length-number-void)
- [`toBeAnArrayWith(...expectedItems: ReadonlyArray<any>): void`](#tobeanarraywiththis-expectation<readonlyarray<any>>-...expecteditems-readonlyarray<any>-void)
- [`toBeAnObjectWith(subset: Object): void`](#tobeanobjectwiththis-expectation<object>-subset-object-void)
- [`toBeExhausted(): void`](#tobeexhaustedthis-expectation<mock<any-any>>-void)
- [`toBeGreaterThan(target: number): void`](#tobegreaterthanthis-expectation<number>-target-number-void)
- [`toBeGreaterThanOrEqualTo(target: number): void`](#tobegreaterthanorequaltothis-expectation<number>-target-number-void)
- [`toBeLessThan(target: number): void`](#tobelessthanthis-expectation<number>-target-number-void)
- [`toBeLessThanOrEqualTo(target: number): void`](#tobelessthanorequaltothis-expectation<number>-target-number-void)
- [`toBeRejected(): Promise<void>`](#toberejectedthis-expectation<promise<any>>-promise<void>)
- [`toBeRejected(errorClass: Newable<Error>, message?: string): Promise<void>`](#toberejectedthis-expectation<promise<any>>-errorclass-newable<error>-message?-string-promise<void>)
- [`toBeRejected(message: string): Promise<void>`](#toberejectedthis-expectation<promise<any>>-message-string-promise<void>)
- [`toEqual(value: T): void`](#toequalvalue-t-void)
- [`toHaveBeenCalledExactlyWith(args: MockArgs<T>[]): void`](#tohavebeencalledexactlywiththis-expectation<mock<any[]-any>>-args-mockargs<t>[]-void)
- [`toHaveBeenCalledWith(args: MockArgs<T>): void`](#tohavebeencalledwiththis-expectation<mock<any[]-any>>-args-mockargs<t>-void)
- [`toLooseEqual(value: any): void`](#tolooseequalvalue-any-void)
- [`toMatchSnapshot(): void`](#tomatchsnapshotthis-expectation<any>-void)
- [`toReferentiallyEqual(value: T): void`](#toreferentiallyequalthis-expectation<t>-value-t-void)
- [`toThrow(): void`](#tothrowthis-expectation<-=>-any>-void)
- [`toThrow(errorClass: Newable<Error>, message?: string): void`](#tothrowthis-expectation<-=>-any>-errorclass-newable<error>-message?-string-void)
- [`toThrow(message: string): void`](#tothrowthis-expectation<-=>-any>-message-string-void)

### Matchers

- [`a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`](#a<t>type-newableorprimitive<t>-class2primitive<t>)
- [`anything(): any`](#anything-any)
- [`arrayOfLength<T>(length: number): T[]`](#arrayoflength<t>length-number-t[])
- [`arrayWith<T>(...items: T[]): T[]`](#arraywith<t>...items-t[]-t[])
- [`containerWith(...items: any[]): any`](#containerwith...items-any[]-any)
- [`numberCloseTo(target: number, options:`](#numberclosetotarget-number-options)
- [`numberGreaterThan(target: number): number`](#numbergreaterthantarget-number-number)
- [`numberGreaterThanOrEqualTo(target: number): number`](#numbergreaterthanorequaltotarget-number-number)
- [`numberLessThan(target: number): number`](#numberlessthantarget-number-number)
- [`numberLessThanOrEqualTo(target: number): number`](#numberlessthanorequaltotarget-number-number)
- [`objectWith(subset: Object): any`](#objectwithsubset-object-any)
- [`stringMatching(pattern: RegExp): string`](#stringmatchingpattern-regexp-string)
- [`stringMatching(substring: string): string`](#stringmatchingsubstring-string-string)

### Mocks

- [`(...args: ARGS): RETURN`](#...args-args-return)
- [`calls: MockCall<ARGS, RETURN>[]`](#calls-mockcall<args-return>[])
- [`executes(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`](#executesimplementation-...args-args[]-=>-return-mock<args-return>)
- [`executesOnce(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`](#executesonceimplementation-...args-args[]-=>-return-mock<args-return>)
- [`executesOnce(implementation: (...args: B) => RETURN): Mock<ARGS, RETURN>`](#executesonceimplementation-...args-b-=>-return-mock<args-return>)
- [`given<B extends ARGS>(...args: B):`](#given<b-extends-args>...args-b)
- [`isExhausted(): boolean`](#isexhausted-boolean)
- [`rejectsWith(error: any): Mock<ARGS, RETURN>`](#rejectswitherror-any-mock<args-return>)
- [`rejectsWithOnce(error: any): Mock<ARGS, RETURN>`](#rejectswithonceerror-any-mock<args-return>)
- [`rejectsWithOnce(error: any): Mock<ARGS, any>`](#rejectswithonceerror-any-mock<args-any>)
- [`resolvesTo(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvestovalue-awaited<return>-mock<args-return>)
- [`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvestooncevalue-awaited<return>-mock<args-return>)
- [`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`](#resolvestooncevalue-awaited<return>-mock<args-return>)
- [`returns(value: RETURN): Mock<ARGS, RETURN>`](#returnsvalue-return-mock<args-return>)
- [`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`](#returnsoncevalue-return-mock<args-return>)
- [`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`](#returnsoncevalue-return-mock<args-return>)
- [`throws(error: any): Mock<ARGS, RETURN>`](#throwserror-any-mock<args-return>)
- [`throwsOnce(error: any): Mock<ARGS, RETURN>`](#throwsonceerror-any-mock<args-return>)
- [`throwsOnce(error: any): Mock<ARGS, RETURN>`](#throwsonceerror-any-mock<args-return>)

## Reference

### Validators

#### **`not(): Expectation<T>`**

* Inverts the behaviour of the validator that follows.
  
#### **`toBeA(this: Expectation<T>, clazz: any): void`**

* Checks if the value is an instance of the provided class or primitive type. Examples:

1. `expect(object).toBeA(MyClass)` - checks if object is instance of `MyClass`, but not `Other`
2. `expect(foo).toBeA(String)` - checks if foo is instance of string
  
*Parameters:*

- `clazz` - type class or primitive constructor to match against.
  
#### **`toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[]): void`**

* Checks if the value is an iterable containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
  
#### **`toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number): void`**

* Checks if the values is an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>): void`**

* Checks if the value is an array containing all of the provided items.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched array. Order of the items doesn't matter.
  
#### **`toBeAnObjectWith(this: Expectation<Object>, subset: Object): void`**

* Checks if the value is an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`toBeExhausted(this: Expectation<Mock<any, any>>): void`**

* Checks if all the expected calls to the mock have been performed.
  
#### **`toBeGreaterThan(this: Expectation<number>, target: number): void`**

* Checks if the value is greater than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeGreaterThanOrEqualTo(this: Expectation<number>, target: number): void`**

* Checks if the value is greater than or equal to the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThan(this: Expectation<number>, target: number): void`**

* Checks if the value is less than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeLessThanOrEqualTo(this: Expectation<number>, target: number): void`**

* Checks if the value is less than or equal the provided target.
  
*Parameters:*

- `target` - number to check against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>): Promise<void>`**

* Awaits the provided promise and expects it to be rejected.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, errorClass: Newable<Error>, message?: string): Promise<void>`**

* Awaits the provided promise and expects it to be rejected. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toBeRejected(this: Expectation<Promise<any>>, message: string): Promise<void>`**

* Awaits the provided promise and expects it to be rejected. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  
#### **`toEqual(value: T): void`**

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
  
#### **`toHaveBeenCalledExactlyWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>[]): void`**

* Checks the entire history of mock calls.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array where each item is an array of values or matchers to check the mock call against.
  
#### **`toHaveBeenCalledWith(this: Expectation<Mock<any[], any>>, args: MockArgs<T>): void`**

* Check if the mock has been called with the provided arguments.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array of values or matchers to check the mock calls against.
  
#### **`toLooseEqual(value: any): void`**

* Performs a recursive equality check. Objects are equal if their fields
are equal. Object prototypes are ignored.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toMatchSnapshot(this: Expectation<any>): void`**

* Checks that the value is the same as in the previous test execution.
  
#### **`toReferentiallyEqual(this: Expectation<T>, value: T): void`**

* Performs a referential equality check using `Object.is`. It is similar to
`===`, with two differences:

1. `Object.is(-0, +0)` returns `false`
2. `Object.is(NaN, NaN)` returns `true`

This function should be used if you care about object identity rather than
deep equality.
  
*Parameters:*

- `value` - value to check against.
  
#### **`toThrow(this: Expectation<() => any>): void`**

* Calls the provided function and expects an error to be thrown.
  
#### **`toThrow(this: Expectation<() => any>, errorClass: Newable<Error>, message?: string): void`**

* Calls the provided function and expects an error to be thrown. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`toThrow(this: Expectation<() => any>, message: string): void`**

* Calls the provided function and expects an error to be thrown. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  

### Matchers

#### **`a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`**

* Matches an instance of the provided class or primitive type. Examples:

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`
  
*Parameters:*

- `type` - class or primitive constructor to match against.
  
#### **`anything(): any`**

* Matches any value.
  
#### **`arrayOfLength<T>(length: number): T[]`**

* Matches an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`arrayWith<T>(...items: T[]): T[]`**

* Matches an array containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched array.
  
#### **`containerWith(...items: any[]): any`**

* Matches an iterable containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched iterable.
  
#### **`numberCloseTo(target: number, options:`**

* Matches numbers that are close to the target value. The options are used
to specify the maximum difference.

The range is [expected - delta, expected + delta] (inclusive).
  
*Parameters:*

- `target` - a number to aim for.
- `options` - an object with the delta parameter, denoting the maximum difference between the values.
  
#### **`numberGreaterThan(target: number): number`**

* Matches a number greater than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberGreaterThanOrEqualTo(target: number): number`**

* Matches a number greater than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThan(target: number): number`**

* Matches a number less than target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`numberLessThanOrEqualTo(target: number): number`**

* Matches a number less than or equal to target.
  
*Parameters:*

- `items` - number to compare to.
  
#### **`objectWith(subset: Object): any`**

* Matches an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`stringMatching(pattern: RegExp): string`**

* Matches strings that conform to the provided pattern.
  
*Parameters:*

- `pattern` - a regexp to test the matched values.
  
#### **`stringMatching(substring: string): string`**

* Matches strings that contain the provided substring.
  
*Parameters:*

- `substring` - a string to look for in the matched values.
  

### Mocks

#### **`(...args: ARGS): RETURN`**

* Calls the mock function.
  
#### **`calls: MockCall<ARGS, RETURN>[]`**

* An array containing all the performed calls.
  
#### **`executes(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`**

* Sets the underlying implementation of the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>`**

* Schedules the mock to use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`executesOnce(implementation: (...args: B) => RETURN): Mock<ARGS, RETURN>`**

* Schedules the mock use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`given<B extends ARGS>(...args: B):`**

* Specifies a different behavior when other arguments are given
  
*Parameters:*

- `args` - arguments to match
  
#### **`isExhausted(): boolean`**

* Checks if all the expected calls to the mock have been performed.
  
#### **`rejectsWith(error: any): Mock<ARGS, RETURN>`**

* Sets the error rejected by calls to the Mock.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<ARGS, RETURN>`**

* Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`rejectsWithOnce(error: any): Mock<ARGS, any>`**

* Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`resolvesTo(value: Awaited<RETURN>): Mock<ARGS, RETURN>`**

* Sets the return value wrapped in Promise.resolve of calls to the Mock.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`**

* Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>`**

* Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returns(value: RETURN): Mock<ARGS, RETURN>`**

* Sets the return value of calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`**

* Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`returnsOnce(value: RETURN): Mock<ARGS, RETURN>`**

* Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`throws(error: any): Mock<ARGS, RETURN>`**

* Sets the error thrown by calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<ARGS, RETURN>`**

* Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`throwsOnce(error: any): Mock<ARGS, RETURN>`**

* Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  