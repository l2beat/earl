---
title: API Reference
outline: deep
---

# {{ $frontmatter.title }}



<style>
  h4 {
    padding-top: 1em;
  }

  :not(h3) + h4 {
    border-top: 1px solid var(--vp-c-divider);
  }
</style>

## Synopsis

### Core

- [`function expect<T>(actual: T, options?: ExpectationOptions)`](#functionexpectT-actual-T-options-ExpectationOptions)

### Validators

- [`.toBeA(clazz: NewableOrPrimitive)`](#toBeA-clazz-NewableOrPrimitive)
- [`.toBeAContainerWith(...expectedItems: T[])`](#toBeAContainerWith-expectedItems-T)
- [`.toBeAnArrayOfLength(length: number)`](#toBeAnArrayOfLength-length-number)
- [`.toBeAnArrayWith(...expectedItems: readonly any[])`](#toBeAnArrayWith-expectedItems-readonlyany)
- [`.toBeAnObjectWith(subset: object)`](#toBeAnObjectWith-subset-object)
- [`.toBeDefined()`](#toBeDefined)
- [`.toBeExhausted()`](#toBeExhausted)
- [`.toBeFalsy()`](#toBeFalsy)
- [`.toBeGreaterThan(target: number)`](#toBeGreaterThan-target-number)
- [`.toBeGreaterThanOrEqualTo(target: number)`](#toBeGreaterThanOrEqualTo-target-number)
- [`.toBeLessThan(target: number)`](#toBeLessThan-target-number)
- [`.toBeLessThanOrEqualTo(target: number)`](#toBeLessThanOrEqualTo-target-number)
- [`.toBeNullish()`](#toBeNullish)
- [`.toBeRejected(errorClass: Newable<Error>, message?: string)`](#toBeRejected-errorClass-NewableError-message-string)
- [`.toBeRejected(message?: string)`](#toBeRejected-message-string)
- [`.toBeTruthy()`](#toBeTruthy)
- [`.toEqual(value: ExpectedEqual<T>)`](#toEqual-value-ExpectedEqualT)
- [`.toHaveBeenCalledExactlyWith(args: MockArgs<T>[])`](#toHaveBeenCalledExactlyWith-args-MockArgsT)
- [`.toHaveBeenCalledWith(args: MockArgs<T>)`](#toHaveBeenCalledWith-args-MockArgsT)
- [`.toLooseEqual(value: any)`](#toLooseEqual-value-any)
- [`.toMatchSnapshot(context: TestContext)`](#toMatchSnapshot-context-TestContext)
- [`.toReferentiallyEqual(value: T)`](#toReferentiallyEqual-value-T)
- [`.toThrow(errorClass: Newable<Error>, message?: string)`](#toThrow-errorClass-NewableError-message-string)
- [`.toThrow(message?: string)`](#toThrow-message-string)

### Modifiers

- [`.not()`](#not)

### Matchers

- [`expect.a<T>(type: NewableOrPrimitive<T>)`](#expectaT-type-NewableOrPrimitiveT)
- [`expect.anything()`](#expectanything)
- [`expect.arrayOfLength<T>(length: number)`](#expectarrayOfLengthT-length-number)
- [`expect.arrayWith<T>(...items: T[])`](#expectarrayWithT-items-T)
- [`expect.containerWith(...items: any[])`](#expectcontainerWith-items-any)
- [`expect.defined()`](#expectdefined)
- [`expect.falsy()`](#expectfalsy)
- [`expect.nullish()`](#expectnullish)
- [`expect.numberCloseTo(target: number, options: NumberCloseToDelta)`](#expectnumberCloseTo-target-number-options-NumberCloseToDelta)
- [`expect.numberGreaterThan(target: number)`](#expectnumberGreaterThan-target-number)
- [`expect.numberGreaterThanOrEqualTo(target: number)`](#expectnumberGreaterThanOrEqualTo-target-number)
- [`expect.numberLessThan(target: number)`](#expectnumberLessThan-target-number)
- [`expect.numberLessThanOrEqualTo(target: number)`](#expectnumberLessThanOrEqualTo-target-number)
- [`expect.objectWith(subset: object)`](#expectobjectWith-subset-object)
- [`expect.stringMatching(pattern: string`](#expectstringMatching-pattern-string)
- [`expect.truthy()`](#expecttruthy)

### Mocks

- [`function mockFn<F extends (...args: any) => any>(defaultImpl?: F)`](#functionmockFnFextends-args-any-any-defaultImpl-F)
- [`function mock(...args: TArgs)`](#functionmock-args-TArgs)
- [`mock.calls`](#mockcalls)
- [`mock.executes(implementation: (...args: TArgs[]) => TReturn)`](#mockexecutes-implementation--args-TArgs-TReturn)
- [`mock.executesOnce(implementation: (...args: TArgs[]) => TReturn)`](#mockexecutesOnce-implementation--args-TArgs-TReturn)
- [`mock.given<TGivenArgs extends TArgs>(...args: TGivenArgs)`](#mockgivenTGivenArgsextendsTArgs-args-TGivenArgs)
- [`mock.isExhausted()`](#mockisExhausted)
- [`mock.rejectsWith(error: any)`](#mockrejectsWith-error-any)
- [`mock.rejectsWithOnce(error: any)`](#mockrejectsWithOnce-error-any)
- [`mock.resolvesTo(value: Awaited<TReturn>)`](#mockresolvesTo-value-AwaitedTReturn)
- [`mock.resolvesToOnce(value: Awaited<TReturn>)`](#mockresolvesToOnce-value-AwaitedTReturn)
- [`mock.returns(value: TReturn)`](#mockreturns-value-TReturn)
- [`mock.returnsOnce(value: TReturn)`](#mockreturnsOnce-value-TReturn)
- [`mock.throws(error: any)`](#mockthrows-error-any)
- [`mock.throwsOnce(error: any)`](#mockthrowsOnce-error-any)

## Reference

### Core

#### **`function expect<T>(actual: T, options?: ExpectationOptions): Expectation<T>`** {#functionexpectT-actual-T-options-ExpectationOptions}

The `expect` function is used every time you want to test a value.
  
*Parameters:*

- `actual` - the value to match against.
- `options` - optional configuration.
  

### Validators

#### **`.toBeA(clazz: NewableOrPrimitive): void`** {#toBeA-clazz-NewableOrPrimitive}

Checks if the value is an instance of a provided class or a primitive type. Works as expected with builtin types like strings, numbers, dates.

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`
  
*Parameters:*

- `clazz` - type class or primitive constructor to match against.
  
*Examples:*


```ts
expect(object).toBeA(MyClass) // checks if object is instance of `MyClass`, but not `Other`
expect(foo).toBeA(String) // checks if foo is instance of string
expect(foo).toBeA(Object) // matches any object (not null)
```
#### **`.toBeAContainerWith(...expectedItems: T[]): void`** {#toBeAContainerWith-expectedItems-T}

Checks if the value is an iterable containing all of the provided items. Internally, container is first turned into array and `toBeAnArrayWith` is used for final comparison.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched iterable. Order of the items doesn't matter.
  
*Examples:*


```ts
expect([1, 2, 3]).toBeAContainerWith(1, 2)
```
#### **`.toBeAnArrayOfLength(length: number): void`** {#toBeAnArrayOfLength-length-number}

Checks if the values is an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
*Examples:*


```ts
expect([1, 2, 3]).toBeAnArrayOfLength(3)
expect([1, 2, 3]).toBeAnArrayOfLength(expect.numberGreaterThanOrEqualTo(3)))
```
#### **`.toBeAnArrayWith(...expectedItems: readonly any[]): void`** {#toBeAnArrayWith-expectedItems-readonlyany}

Checks if the value is an array containing all of the provided items. Each expected item must be matched uniquely.
  
*Parameters:*

- `expectedItems` - values or matchers to look for in the matched array. Order of the items doesn't matter.
  
*Examples:*


```ts
expect([1, 2, 3]).toBeAnArrayWith(1)
expect([1]).toBeAnArrayWith(1, 1) // throws b/c a second "1" is missing
```
#### **`.toBeAnObjectWith(subset: object): void`** {#toBeAnObjectWith-subset-object}

Checks if the value is an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
*Examples:*


```ts
expect({ a: 1, b: 2, c: 3 }).toBeAnObjectWith({ b: 2, a: 1 })
```
#### **`.toBeDefined(): void`** {#toBeDefined}

Checks if the value is different to `undefined` and `null`.
  
*Examples:*


```ts
expect(0).toBeDefined()
expect(null).not.toBeDefined()
```
#### **`.toBeExhausted(): void`** {#toBeExhausted}

Checks if all the expected calls to the mock have been performed.
  
#### **`.toBeFalsy(): void`** {#toBeFalsy}

Checks if the value is falsy.
  
*Examples:*


```ts
expect(0).toBeFalsy()
expect(true).not.toBeFalsy()
```

There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`.
Everything else is truthy.
#### **`.toBeGreaterThan(target: number): void`** {#toBeGreaterThan-target-number}

Checks if the value is greater than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
*Examples:*


```ts
expect(2).toBeGreaterThan(1)
expect(1).not.toBeGreaterThan(1)
expect(-3).not.toBeGreaterThan(1)
```
#### **`.toBeGreaterThanOrEqualTo(target: number): void`** {#toBeGreaterThanOrEqualTo-target-number}

Checks if the value is greater than or equal to the provided target.
  
*Parameters:*

- `target` - number to check against.
  
*Examples:*


```ts
expect(2).toBeGreaterThanOrEqualTo(1)
expect(1).toBeGreaterThanOrEqualTo(1)
expect(-3).not.toBeGreaterThanOrEqualTo(1)
```
#### **`.toBeLessThan(target: number): void`** {#toBeLessThan-target-number}

Checks if the value is less than the provided target.
  
*Parameters:*

- `target` - number to check against.
  
*Examples:*


```ts
expect(-3).toBeLessThan(1)
expect(1).not.toBeLessThan(1)
expect(2).not.toBeLessThan(1)
```
#### **`.toBeLessThanOrEqualTo(target: number): void`** {#toBeLessThanOrEqualTo-target-number}

Checks if the value is less than or equal the provided target.
  
*Parameters:*

- `target` - number to check against.
  
*Examples:*


```ts
expect(-3).toBeLessThanOrEqualTo(1)
expect(1).toBeLessThanOrEqualTo(1)
expect(2).not.toBeLessThanOrEqualTo(1)
```
#### **`.toBeNullish(): void`** {#toBeNullish}

Checks if the value is `undefined` or `null`.
  
*Examples:*


```ts
expect(undefined).toBeNullish()
expect(false).not.toBeNullish()
```
#### **`.toBeRejected(errorClass: Newable<Error>, message?: string): Promise<void>`** {#toBeRejected-errorClass-NewableError-message-string}

Awaits the provided promise and expects it to be rejected. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
#### **`.toBeRejected(message?: string): Promise<void>`** {#toBeRejected-message-string}

Awaits the provided promise and expects it to be rejected. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  
*Examples:*


```ts
const promise = Promise.reject(new Error('oops, sorry'))

await expect(promise).toBeRejected(Error, 'oops')
await expect(promise).not.toBeRejected(TypeError)
```
#### **`.toBeTruthy(): void`** {#toBeTruthy}

Checks if the value is truthy.
  
*Examples:*


```ts
expect(1).toBeTruthy()
expect(false).not.toBeTruthy()
```

There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`.
Everything else is truthy.
#### **`.toEqual(value: ExpectedEqual<T>): void`** {#toEqual-value-ExpectedEqualT}

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
#### **`.toHaveBeenCalledExactlyWith(args: MockArgs<T>[]): void`** {#toHaveBeenCalledExactlyWith-args-MockArgsT}

Checks the entire history of mock calls.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array where each item is an array of values or matchers to check the mock call against.
  
#### **`.toHaveBeenCalledWith(args: MockArgs<T>): void`** {#toHaveBeenCalledWith-args-MockArgsT}

Check if the mock has been called with the provided arguments.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `args` - an array of values or matchers to check the mock calls against.
  
#### **`.toLooseEqual(value: any): void`** {#toLooseEqual-value-any}

Performs a recursive equality check. Objects are equal if their fields
are equal. Object prototypes are ignored.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.
  
*Parameters:*

- `value` - value to check against.
  
*Examples:*


```ts
class A {
  a = 1
}

// using toEqual requires matching prototypes
expect(new A()).not.toEqual({ a: 1 })
// toLooseEqual ignores prototypes and focuses only on the value
expect(new A()).toLooseEqual({ a: 1 })
```
#### **`.toMatchSnapshot(context: TestContext): void`** {#toMatchSnapshot-context-TestContext}

Checks that the value is the same as in the previous test execution.
  
#### **`.toReferentiallyEqual(value: T): void`** {#toReferentiallyEqual-value-T}

Performs a referential equality check using `Object.is`. It is similar to
`===`, with two differences:

1. `Object.is(-0, +0)` returns `false`
2. `Object.is(NaN, NaN)` returns `true`

This function should be used if you care about object identity rather than
deep equality.
  
*Parameters:*

- `value` - value to check against.
  
*Examples:*


```ts
const x = {}
expect(x).toReferentiallyEqual(x)
expect({}).not.toReferentiallyEqual(x)
expect(NaN).toReferentiallyEqual(NaN)
```
#### **`.toThrow(errorClass: Newable<Error>, message?: string): void`** {#toThrow-errorClass-NewableError-message-string}

Calls the provided function and expects an error to be thrown. The error's
class and message are also checked.
  
*Parameters:*

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against.
  
*Examples:*


```ts
const doThrow = () => {
  throw new Error('oops, sorry')
}

expect(() => doThrow()).toThrow(Error, 'oops')
expect(() => doThrow()).not.toThrow(TypeError)
```
#### **`.toThrow(message?: string): void`** {#toThrow-message-string}

Calls the provided function and expects an error to be thrown. The message
of the error is also checked.
  
*Parameters:*

- `message` - string or matcher to check the message against.
  
*Examples:*


```ts
const doThrow = () => { throw new Error('oops, sorry') }

expect(() => doThrow()).toThrow('oops')
expect(() => doThrow()).not.toThrow(expect.stringMatching(/end$/))
```

### Modifiers

#### **`.not(): Expectation<T>`** {#not}

Inverts the behaviour of the validator that follows.
  
*Examples:*


```ts
expect(3).toEqual(4) // ❌
expect(3).not.toEqual(4) // ✅
```

### Matchers

#### **`expect.a<T>(type: NewableOrPrimitive<T>): Class2Primitive<T>`** {#expectaT-type-NewableOrPrimitiveT}

Matches an instance of a provided class or a primitive type. Works as expected with builtin types like strings, numbers, dates.

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`
  
*Parameters:*

- `type` - class or primitive constructor to match against.
  
*Examples:*


```ts
expect(something).toEqual(expect.a(MyClass)) // matches any object of instance MyClass but not `other`
expect(something).toEqual(expect.a(String)) // matches any string
expect(something).toEqual(expect.a(Object)) // matches any object (not null)
```
#### **`expect.anything(): any`** {#expectanything}

Matches any value.
  
*Examples:*


```ts
expect(null).toEqual(expect.anything())
expect({ a: 'something' }).toEqual({ a: expect.anything() })
```
#### **`expect.arrayOfLength<T>(length: number): T[]`** {#expectarrayOfLengthT-length-number}

Matches an array containing exactly given number of items.
  
*Parameters:*

- `length` - expected array length. Can be a matcher.
  
#### **`expect.arrayWith<T>(...items: T[]): T[]`** {#expectarrayWithT-items-T}

Matches an array containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched array.
  
#### **`expect.containerWith(...items: any[]): any`** {#expectcontainerWith-items-any}

Matches an iterable containing the provided items.
  
*Parameters:*

- `items` - values or matchers to look for in the matched iterable.
  
#### **`expect.defined(): any`** {#expectdefined}

Matches any value that is not `null` or `undefined`.
  
*Examples:*


```ts
expect({ a: 0 }).toEqual({ a: expect.defined() })
expect({ a: null }).not.toEqual({ a: expect.defined() })
```
#### **`expect.falsy(): any`** {#expectfalsy}

Matches any falsy value.
  
*Examples:*


```ts
expect({ a: 0 }).toEqual({ a: expect.falsy() })
expect([true]).not.toEqual([expect.falsy()])
```

There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`.
Everything else is truthy.
#### **`expect.nullish(): any`** {#expectnullish}

Matches `null` and `undefined`
  
*Examples:*


```ts
expect({ a: undefined }).toEqual({ a: expect.nullish() })
expect([null]).toEqual([expect.nullish()])
```
#### **`expect.numberCloseTo(target: number, options: NumberCloseToDelta): number`** {#expectnumberCloseTo-target-number-options-NumberCloseToDelta}

Matches numbers that are close to the target value. The options are used
to specify the maximum difference.

The range is [expected - delta, expected + delta] (inclusive).
  
*Parameters:*

- `target` - a number to aim for.
- `options` - an object with the delta parameter, denoting the maximum difference between the values.
  
#### **`expect.numberGreaterThan(target: number): number`** {#expectnumberGreaterThan-target-number}

Matches a number greater than target.
  
*Parameters:*

- `target` - number to compare to.
  
#### **`expect.numberGreaterThanOrEqualTo(target: number): number`** {#expectnumberGreaterThanOrEqualTo-target-number}

Matches a number greater than or equal to target.
  
*Parameters:*

- `target` - number to compare to.
  
*Examples:*


```ts
expect({ a: 2 }).toEqual({
  a: expect.numberGreaterThanOrEqualTo(1),
})
expect({ b: 2 }).toEqual({
  b: expect.numberGreaterThanOrEqualTo(2),
})
expect({ c: 2 }).not.toEqual({
  c: expect.numberGreaterThanOrEqualTo(3),
})
```
#### **`expect.numberLessThan(target: number): number`** {#expectnumberLessThan-target-number}

Matches a number less than target.
  
*Parameters:*

- `target` - number to compare to.
  
*Examples:*


```ts
expect({ a: 2 }).toEqual({ a: expect.numberLessThan(3) })
expect({ b: 2 }).not.toEqual({ b: expect.numberLessThan(2) })
expect({ c: 2 }).not.toEqual({ c: expect.numberLessThan(1) })
```
#### **`expect.numberLessThanOrEqualTo(target: number): number`** {#expectnumberLessThanOrEqualTo-target-number}

Matches a number less than or equal to target.
  
*Parameters:*

- `target` - number to compare to.
  
*Examples:*


```ts
expect({ a: 2 }).toEqual({
  a: expect.numberLessThanOrEqualTo(3),
})
expect({ b: 2 }).toEqual({
  b: expect.numberLessThanOrEqualTo(2),
})
expect({ c: 2 }).not.toEqual({
  c: expect.numberLessThanOrEqualTo(1),
})
```
#### **`expect.objectWith(subset: object): any`** {#expectobjectWith-subset-object}

Matches an object containing given key-value pairs.
  
*Parameters:*

- `subset` - an object to match against.
  
#### **`expect.stringMatching(pattern: string`** {#expectstringMatching-pattern-string}

Matches strings that contain the provided substring.
  
*Parameters:*

- `pattern` - a string to look for in the matched values or a regexp to test the matched values.
  
#### **`expect.truthy(): any`** {#expecttruthy}

Matches any truthy value.
  
*Examples:*


```ts
expect({ a: 1 }).toEqual({ a: expect.truthy() })
expect([false]).not.toEqual([expect.truthy()])
```

There are six falsy values in JavaScript: `false`, `0`, `''`, `null`, `undefined`, and `NaN`.
Everything else is truthy.

### Mocks

#### **`function mockFn<F extends (...args: any) => any>(defaultImpl?: F): Mock.Of<F>`** {#functionmockFnFextends-args-any-any-defaultImpl-F}

Creates a mock conforming to a given signature.
  
*Examples:*


```ts
const mock1 = mockFn<[number, string], number>()
const mock2 = mockFn<(a: number, b: string) => number>()
```
#### **`function mock(...args: TArgs): TReturn`** {#functionmock-args-TArgs}

Calls the mock function.
  
#### **`mock.calls: MockCall<TArgs, TReturn>[]`** {#mockcalls}

An array containing all the performed calls.
  
#### **`mock.executes(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>`** {#mockexecutes-implementation--args-TArgs-TReturn}

Sets the underlying implementation of the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`mock.executesOnce(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>`** {#mockexecutesOnce-implementation--args-TArgs-TReturn}

Schedules the mock to use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
#### **`mock.given<TGivenArgs extends TArgs>(...args: TGivenArgs): MockGiven<TArgs, TReturn, TGivenArgs>`** {#mockgivenTGivenArgsextendsTArgs-args-TGivenArgs}

Specifies a different behavior when other arguments are given
  
*Parameters:*

- `args` - arguments to match.
  
#### **`mock.isExhausted(): boolean`** {#mockisExhausted}

Checks if all the expected calls to the mock have been performed.
  
#### **`mock.rejectsWith(error: any): Mock<TArgs, TReturn>`** {#mockrejectsWith-error-any}

Sets the error rejected by calls to the Mock.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`mock.rejectsWithOnce(error: any): Mock<TArgs, any>`** {#mockrejectsWithOnce-error-any}

Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`mock.resolvesTo(value: Awaited<TReturn>): Mock<TArgs, TReturn>`** {#mockresolvesTo-value-AwaitedTReturn}

Sets the return value wrapped in Promise.resolve of calls to the Mock.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`mock.resolvesToOnce(value: Awaited<TReturn>): Mock<TArgs, TReturn>`** {#mockresolvesToOnce-value-AwaitedTReturn}

Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`mock.returns(value: TReturn): Mock<TArgs, TReturn>`** {#mockreturns-value-TReturn}

Sets the return value of calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`mock.returnsOnce(value: TReturn): Mock<TArgs, TReturn>`** {#mockreturnsOnce-value-TReturn}

Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
#### **`mock.throws(error: any): Mock<TArgs, TReturn>`** {#mockthrows-error-any}

Sets the error thrown by calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `error` - error to be thrown.
  
#### **`mock.throwsOnce(error: any): Mock<TArgs, TReturn>`** {#mockthrowsOnce-error-any}

Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  