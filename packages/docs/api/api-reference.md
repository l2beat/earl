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
- [`toHaveBeenCalledWith(args)`](#tohavebeencalledwithargs)
- [`toHaveBeenCalledExactlyWith(args)`](#tohavebeencalledexactlywithargs)
- [`toMatchSnapshot()`](#tomatchsnapshot)

### Matchers

- [`expect.anything()`](#expectanything)
- [`expect.a(type)`](#expectatype)
- [`stringMatching(substring | regexp)`](#expectstringmatchingsubstring--regexp)
- [`numberCloseTo(expected: number, { delta: number })`](#expectnumberclosetoexpected-number--delta-number-)
- [`expect.containerWith<T>(...items: T[])`](#expectcontainerwithitems-t)
- [`expect.arrayWith<T>(...items: T[])`](#expectarraywithitems-t)
- [`expect.objectWith(subset)`](#expectobjectwithsubset)

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

#### expect(any, options?)

`options.extraMessage` - provide extra message to make it easier to understand
when your assertion fails

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

#### expect.arrayWith(...items: T[])

Matches an array containing the provided items.

Arguments:

- `items` - values or matchers to look for in the matched iterable.

#### expect.objectWith(subset)

Matches an object containing given key-value pairs.

Arguments:

- `subset` - an object to match against.

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
