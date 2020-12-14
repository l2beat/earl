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
- [`toBeGreaterThan(number)`](#tobegreaterthannumber)
- [`toBeGreaterThanOrEqualTo(number)`](#tobegreaterthanorequaltonumber)
- [`toBeLessThan(number)`](#tobelessthannumber)
- [`toBeLessThanOrEqualTo(number)`](#tobelessthanorequaltonumber)
- [`toHaveBeenCalledWith(args)`](#tohavebeencalledwithargs)
- [`toHaveBeenCalledExactlyWith(args)`](#tohavebeencalledexactlywithargs)
- [`toMatchSnapshot()`](#tomatchsnapshot)

### Matchers

- [`expect.anything()`](#expectanything)
- [`expect.a(class)`](#expectaclass)
- [`stringMatching(substring | regexp)`](#expectstringmatchingsubstring--regexp)
- [`numberCloseTo(expected: number, { delta: number })`](#expectnumberclosetoexpected-number--delta-number-)
- [`expect.containerWith<T>(...items: T[])`](#expectcontainerwithvalue-t)
- [`expect.arrayWith<T>(...items: T[])`](#expectarraywithvalues-t)
- [`expect.objectWith<T>(item: T)`](#expectobjectwith)
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

#### expect(any, options?)

`options.extraMessage` - provide extra message to make it easier to understand
when your assertion fails

### Validators

#### toEqual(any)

Performs deep equality check, ensures type equality, supports matchers.

#### toLooseEqual(any)

Using less strict equality algorithm then `toEqual`: when two object values have
same fields and values but different prototype they will be considered equal
with `toLooseEqual`. Further more it lacks type safety as expected and actual
value types doesn't have to match.

#### toReferentiallyEqual(any)

Checks referential equality, uses `Object.is` under the hood. Does not support
matchers.

We recommend it for checking if objects are really the same objects ( not
objects that are deeply equal). For primitive values you should always prefer
`toEqual` unless you really care for about benefits of `Object.is` (checking
against symbols, or `+0`, `-0`).

#### toThrow()

Checks if any error was thrown. Requires checked value to be a parameterless
function.

#### toThrow(errorString)

Checks if error with a matching message was thrown. Requires checked value to be
a parameterless function. `errorString` can be a matcher (for example
[stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp))

#### toThrow(errorClass, errorString?)

Checks if error matching errorClass and optionally errorString was thrown.
Requires checked value to be a parameterless function. `errorString` can be a
matcher (for example
[stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp))

#### toBeRejected()

Checks if a promise was rejected with any error. It returns a promise so you
need to await whole expectation.

#### toBeRejected(errorString)

Checks if a promise was rejected with error with a matching error string. It
returns a promise so you need to await whole expectation. `errorString` can be a
matcher (for example
[stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp))

#### toBeRejected(errorClass, errorString)

Checks if a promise was rejected with error matching error class and optionally
error string. It returns a promise so you need to await whole expectation.
`errorString` can be a matcher (for example
[stringMatcher](/api/api-reference#expectstringmatchingsubstring--regexp))

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

Checks if a given mock is exhausted (has next value).

#### toHaveBeenCalledWith(args)

Checks if mock was called with a given arguments. Order of calls doesn't matter.
`args` is an array of arguments, argument can be a matcher.

#### toHaveBeenCalledExactlyWith(args)

Checks if mock was called with all given arguments. Order of calls matter.
`args` is an array of array of arguments, argument can be a matcher.

#### toMatchSnapshot()

Match actual value to a snapshot. The name of the snapshot is derived from the
suite and test case names. A snapshot will be created under `__snapshot__`
folder.

Set `UPDATE_SNAPSHOTS=true` environment variable to update snapshots.

Requires [test runner integration](/guides/test-runner-integration.md).

### Matchers

#### expect.anything()

Matches anything.

#### expect.a(class)

Matches any instance of a class. Works as expected with primitives like String,
Number etc.

**Note**: it doesn't work with TypeScript types because they are erased from the
output - you need a JS class.

##### Examples

```typescript
expect(something).toEqual(expect.a(String)) // matches any string
expect(something).toEqual(expect.a(Object)) // matches any object (not null)
```

#### expect.stringMatching(substring | regexp)

Matches any string containing given substring or matching given pattern.

#### expect.numberCloseTo(expected: number, { delta: number })

Matches any number within proximity of expected number.

The range is <expected - delta, expected + delta> (inclusive).

#### expect.containerWith(value: T)

Matches a iterable (array / set etc.) containing value

#### expect.arrayWith(...values: T)

Matches an array containing expected value or values.

#### expect.objectWith(value: T)

Matches an object containing given key-value pairs.

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

Makes expectation fail when it should succeed and succeed when it should fail.

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
