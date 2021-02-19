---
id: api-reference
title: API reference
---

### Core

- [`expect(any, options?)`](#expectany-options)

### Validators

- [`toEqual(any)`](#toequalany)
- [`toLooseEqual(any)`](#tolooseequalany)
- [`toReferentiallyEqual(any)`](#tostrictequalany)
- [`toThrow()`](#tothrow)
- [`toBeRejected()`](#toberejectedobject)
- [`toBeExhausted()`](#tobeexhausted)
- [`toBeA(class)`](#tobeaclass)
- [`toBeAContainerWith(...expectedItems)`](#tobeacontainerwithexpecteditems)
- [`toBeAnArrayOfLength(length)`](#tobeanarrayoflengthlength)
- [`toBeAnArrayWith(...expectedItems)`](#tobeanarraywithexpecteditems)
- [`toBeAnObjectWith(subset)`](#tobeanobjectwithsubset)
- [`toBeGreaterThan(number)`](#tobegreaterthannumber)
- [`toBeGreaterThanOrEqualTo(number)`](#tobegreaterthanorequaltonumber)
- [`toBeLessThan(number)`](#tobelessthannumber)
- [`toBeLessThanOrEqualTo(number)`](#tobelessthanorequaltonumber)
- [`toHaveBeenCalledWith(args)`](#tohavebeencalledwithargs)
- [`toHaveBeenCalledExactlyWith(args)`](#tohavebeencalledexactlywithargs)
- [`toMatchSnapshot()`](#tomatchsnapshot)

### Matchers

- [`expect.anything()`](#expectanything)
- [`expect.a(type)`](#expectatype)
- [`stringMatching(substring | regexp)`](#expectstringmatchingsubstring--regexp)
- [`numberCloseTo(expected: number, { delta: number })`](#expectnumberclosetoexpected-number--delta-number-)
- [`expect.containerWith<T>(...items: T[])`](#expectcontainerwithitems-t)
- [`expect.arrayOfLength(length: number)`](#expectarrayoflengthlength-number)
- [`expect.arrayWith<T>(...items: T[])`](#expectarraywithitems-t)
- [`expect.objectWith(subset)`](#expectobjectwithsubset)
- [`expect.numberGreaterThan(number)`](#expectnumbergreaterthannumber)
- [`expect.numberGreaterThanOrEqualTo(number)`](#expectnumbergreaterthanorequaltonumber)
- [`expect.numberLessThan(number)`](#expectnumberlessthannumber)
- [`expect.numberLessThanOrEqualTo(number)`](#expectnumberlessthanorequaltonumber)

### Modifiers

- [`not`](#not)

### Mocks

- [`mockFn<Args, Return>()`](#mockfnargs-return)
  - [`expectedCall(...args)`](#expectedcallargs)
    - [`returnsOnce(value)`](#executesoncefn)
    - [`returns(value)`](#returnsvalue)
    - [`executesOnce(fn)`](#executesoncefn)
    - [`executes(fn)`](#executesfn)
    - [`throwsOnce(error)`](#throwsonceerror)
    - [`throws(error)`](#throwserror)
    - [`resolvesToOnce(value)`](#resolvestooncevalue)
    - [`resolvesTo(value)`](#resolvestovalue)
    - [`rejectsWithOnce(error)`](#rejectswithonceerror)
    - [`rejectsWith(error)`](#rejectswitherror)
    - [`given(args)`](#givenargs)

## Reference

### Core

#### expect(value: any, options?: Options)

`options.extraMessage` - provide an extra message to make it easier to
understand when an assertion fails

### Validators

#### toEqual(any)

Performs a recursive equality check. Objects are equal if their fields are equal
and they share the same prototype.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.

Arguments:

- `value` - value to check against.

Examples:

```ts
expect('foo').toEqual('foo')
expect([1, { a: 2 }]).toEqual([1, { a: expect.a(Number) }])
expect({ a: 2, b: 2 }).not.toEqual({ a: 2 })
```

#### toLooseEqual(any)

Performs a recursive equality check. Objects are equal if their fields are
equal. Object prototypes are ignored.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.

Arguments:

- `value` - value to check against.

Examples:

```ts
class A {
  a = 1
}

// using toEqual requires matching prototypes
expect(new A()).not.toEqual({ a: 1 })
// toLooseEqual ignores prototypes and focuses only on the value
expect(new A()).toLooseEqual({ a: 1 })
```

#### toReferentiallyEqual(any)

Performs a referential equality check using `Object.is`. It is similar to `===`,
with two differences:

1. `Object.is(-0, +0)` returns `false`
2. `Object.is(NaN, NaN)` returns `true`

This function should be used if you care about object identity rather than deep
equality.

Arguments:

- `value` - value to check against.

Examples:

```ts
const x = {}

expect(x).toReferentiallyEqual(x)
expect({}).not.toReferentiallyEqual(x)
expect(NaN).toReferentiallyEqual(NaN)
expect(-0).not.toReferentiallyEqual(+0)
```

#### toThrow()

Calls the provided function and expects an error to be thrown.

Examples:

```ts
const doThrow = () => {
  throw new Error('oops, sorry')
}

expect(() => doThrow()).toThrow()
expect(() => {}).not.toThrow()
```

#### toThrow(message)

Calls the provided function and expects an error to be thrown. The message of
the error is also checked.

Arguments:

- `message` - string or matcher to check the message against (for example
  [stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp)).

Examples:

```ts
const doThrow = () => {
  throw new Error('oops, sorry')
}

expect(() => doThrow()).toThrow('oops')
expect(() => doThrow()).not.toThrow(expect.stringMatching(/end$/))
```

#### toThrow(errorClass, message?)

Calls the provided function and expects an error to be thrown. The error's class
and message are also checked.

Arguments:

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against (for example
  [stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp)).

Examples:

```ts
const doThrow = () => {
  throw new Error('oops, sorry')
}

expect(() => doThrow()).toThrow(Error, 'oops')
expect(() => doThrow()).not.toThrow(TypeError)
```

#### toBeRejected()

Awaits the provided promise and expects it to be rejected.

Examples:

```ts
const promise = Promise.reject(new Error('oops, sorry'))

await expect(promise).toBeRejected()
await expect(Promise.resolve()).not.toBeRejected()
```

#### toBeRejected(message)

Awaits the provided promise and expects it to be rejected. The error's class and
message are also checked.

Arguments:

- `message` - string or matcher to check the message against (for example
  [stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp)).

Examples:

```ts
const promise = Promise.reject(new Error('oops, sorry'))

await expect(promise).toBeRejected('oops')
await expect(promise).not.toBeRejected(expect.stringMatching(/end$/))
```

#### toBeRejected(errorClass, message?)

Awaits the provided promise and expects it to be rejected. The error's class and
message are also checked.

Arguments:

- `errorClass` - expected class of the thrown error.
- `message` - string or matcher to check the message against (for example
  [stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp)).

Examples:

```ts
const promise = Promise.reject(new Error('oops, sorry'))

await expect(promise).toBeRejected(Error, 'oops')
await expect(promise).not.toBeRejected(TypeError)
```

#### toBeA(class)

Checks if the value is an instance of the provided class or primitive type.

Examples:

```ts
expect(object).toBeA(MyClass) // checks if object is instance of `MyClass`, but not `Other`
expect(foo).toBeA(String) // checks if foo is instance of string
```

#### toBeAContainerWith(...expectedItems)

Checks if the value is an iterable containing all of the provided items.

Examples:

```ts
expect([1, 2, 3]).toBeAContainerWith(1, 2)
```

#### toBeAnArrayOfLength(length)

Checks if the values is an array containing exactly given number of items.

Examples:

```ts
expect([1, 2, 3]).toBeAnArrayOfLength(3)
expect([1, 2, 3]).toBeAnArrayOfLength(expect.numberGreaterThanOrEqualTo(3)))
```

#### toBeAnArrayWith(...expectedItems)

Checks if the value is an array containing all of the provided items.

Examples:

```ts
expect([1, 2, 3]).toBeAnArrayWith(1)
```

#### toBeAnObjectWith(subset)

Checks if the value is an object containing given key-value pairs.

Examples:

```ts
expect({ a: 1, b: 2, c: 3 }).toBeAnArrayWith({ b: 2, a: 1 })
```

#### toBeGreaterThan(number)

Checks if the value is greater than the provided target.

Examples:

```ts
expect(2).toBeGreaterThan(1)
expect(1).not.toBeGreaterThan(1)
expect(-3).not.toBeGreaterThan(1)
```

#### toBeGreaterThanOrEqualTo(number)

Checks if the value is greater than or equal to the provided target.

Examples:

```ts
expect(2).toBeGreaterThanOrEqualTo(1)
expect(1).toBeGreaterThanOrEqualTo(1)
expect(-3).not.toBeGreaterThanOrEqualTo(1)
```

#### toBeLessThan(number)

Checks if the value is less than the provided target.

Examples:

```ts
expect(-3).toBeLessThan(1)
expect(1).not.toBeLessThan(1)
expect(2).not.toBeLessThan(1)
```

#### toBeLessThanOrEqualTo(number)

Checks if the value is less than or equal the provided target.

Examples:

```ts
expect(-3).toBeLessThanOrEqualTo(1)
expect(1).toBeLessThanOrEqualTo(1)
expect(2).not.toBeLessThanOrEqualTo(1)
```

#### toBeExhausted()

Checks if all the expected calls to the mock have been performed.

#### toHaveBeenCalledWith(args)

Check if the mock has been called with the provided arguments.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.

Arguments:

- `args` - an array of values or matchers to check the mock calls against.

#### toHaveBeenCalledExactlyWith(args)

Checks the entire history of mock calls.

You can use matchers in place of a value. When a matcher is encountered its
internal rules are used instead of the usual checks.

Arguments:

- `args` - an array where each item is an array of values or matchers to check
  the mock call against.

#### toMatchSnapshot()

Checks that the value is the same as in the previous test execution.

The name of the snapshot is derived from the suite and test case names. A
snapshot will be created under `__snapshot__` folder.

Set `UPDATE_SNAPSHOTS=true` environment variable to update snapshots.

Requires [test runner integration](/guides/test-runner-integration.md).

### Matchers

#### expect.anything()

Matches any value.

#### expect.a(type)

Matches an instance of the provided class or primitive type. Examples:

1. `expect.a(MyClass)` - matches `new MyClass`, but not `new Other()`
2. `expect.a(String)` - matches `"foo"`, but not `123`

Arguments:

- `type` class or primitive constructor to match against.

**Note**: it doesn't work with TypeScript types because they are erased from the
output - you need a JS class.

Examples:

```ts
expect(something).toEqual(expect.a(String)) // matches any string
expect(something).toEqual(expect.a(Object)) // matches any object (not null)
```

#### expect.stringMatching(substring | regexp)

Matches strings that contain the provided substring.

Arguments:

- `value` - a string to look for in the matched values or a regexp to test the
  matched values.

#### expect.numberCloseTo(expected: number, { delta: number })

Matches numbers that are close to the target value. The options are used to
specify the maximum difference.

Arguments:

- `target` - a number to aim for.
- `options` - an object with the delta parameter, denoting the maximum
  difference between the values.

#### expect.containerWith(...items: T[])

Matches an iterable containing the provided items.

Arguments:

- `items` - values or matchers to look for in the matched iterable.

#### expect.arrayOfLength(length: number)

Matches an array containing exactly given number of items.

Arguments:

- `length` - expected array length. Can be a matcher.

#### expect.arrayWith(...items: T[])

Matches an array containing the provided items.

Arguments:

- `items` - values or matchers to look for in the matched iterable.

#### expect.objectWith(subset)

Matches an object containing given key-value pairs.

Arguments:

- `subset` - an object to match against.

#### expect.numberGreaterThan(number)

Matches a number greater than target.

Examples:

```ts
expect({ a: 2 }).toEqual({
  a: expect.numberGreaterThan(1),
})

expect({ b: 2 }).not.toEqual({
  b: expect.numberGreaterThan(2),
})

expect({ c: 2 }).not.toEqual({
  c: expect.numberGreaterThan(3),
})
```

#### expect.numberGreaterThanOrEqualTo(number)

Matches a number greater than or equal to target.

Examples:

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

#### expect.numberLessThan(number)

Matches a number less than target.

Examples:

```ts
expect({ a: 2 }).toEqual({
  a: expect.numberLessThan(3),
})

expect({ b: 2 }).not.toEqual({
  b: expect.numberLessThan(2),
})

expect({ c: 2 }).not.toEqual({
  c: expect.numberLessThan(1),
})
```

#### expect.numberLessThanOrEqualTo(number)

Matches a number less than or equal to target.

Examples:

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

### Modifiers

#### not

Inverts the behaviour of the validator that follows.

Examples:

```ts
expect(3).toEqual(4) // fails
expect(3).not.toEqual(4) // succeeds
```

### Mocks

#### mockFn<ARGS, RETURN>()

#### mockFn<FUNCTION_SIGNATURE>()

Create a mock conforming to a given signature.

##### Example:

```typescript
const mock = mockFn<[string], number>()
```

#### returnsOnce(value)

Return a given value once.

#### returns(value)

Return a given value indefinitely.

#### executesOnce(fn)

Execute a given code one.

#### executes(fn)

Execute a given code indefinitely.

#### throwsOnce(error)

Throw a given error once.

#### throws(error)

Throw a given error indefinitely.

#### resolvesToOnce(value)

Same as `returnsOnce(Promise.resolve(value))`

#### resolvesTo(value)

Same as `returns(Promise.resolve(value))`

#### rejectsWithOnce(error)

Same as `returnsOnce(Promise.reject(error))`

#### rejectsWith(error)

Same as `returns(Promise.reject(error))`

#### given(args)

Specify a different behavior when called with given arguments. Given returns an
object that allows to customize behaviour with any of the following methods:
`returnsOnce`, `executesOnce`, `throwsOnce`, `resolvesToOnce`,
`rejectsWithOnce`.
