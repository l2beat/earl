---
id: api-reference
title: API reference
---

### Validators

- [`toEqual(object)`](#toequalobject)
- [`toLooseEqual(object)`](#tolooseequalobject)
- [`toThrow(object)`](#tothrowobject)
- [`toBeRejected(object)`](#toberejectedobject)
- [`toBeExhausted()`](#tobeexhausted)

### Matchers

- [`expect.anything()`](#expectanything)
- [`expect.a(class)`](#expectaclass)
- [`stringMatching(substring | regexp)`](#expectstringmatchingsubstring--regexp)
- [`numberCloseTo(expected: number, delta: number)`](#expectnumberclosetoexpected-number-delta-number)
- [`error(msg: string)`](#expecterrormsg-string)
- [`error(errorCls, msg?: string)`](#expecterrorerrorcls-msg-string)

### Modifiers

- [`not`](#not)

### Mocks

- [`mockFn<Args, Return>()`](#mockfnargs-return)
  - [`expectedCall(...args)`](#expectedcallargs)
    - [`returns(value)`](#returnsvalue)
    - [`executes(fn)`](#executesfn)
    - [`throws(error)`](#throwserror)
    - [`resolvesTo(value)`](#resolvestovalue)
    - [`rejectsWith(error)`](#rejectswitherror)

## Reference

### Validators

#### toEqual(object)

Performs deep equality check, ensures type equality, supports matchers. If no
arg is provided it will be autofixed.

#### toLooseEqual(object)

Like `toEqual` but without type checking. If no arg is provided it will be
autofixed.

#### toThrow(object)

Checks if expected error was throws. It uses the same equality logic as
`toEqual`. Use `expect.error()` matcher to quickly match errors. Requires
checked value to be a parameterless function. If no arg is provided it will be
autofixed.

#### toBeRejected(object)

Checks if promise was rejected with a expected value. It uses the same equality
logic as `toEqual`. Use `expect.error()` matcher to quickly match errors.
Autofix currently not available.

#### toBeExhausted()

Checks if given mock is exhausted. It's not needed when
[Test runner integration](../guides/test-runner-integration.md) is enabled.

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

#### expect.numberCloseTo(expected: number, delta: number)

Matches any number within proximity of expected number.

#### expect.error(msg: string)

Matches any error with matching error message. `msg` can be a matcher.

#### expect.error(errorCls, msg?: string)

Matches any error which is instance of `errorCls` with matching error message.

### Modifiers

#### not

Makes expectation fail when it should succeed and succeed when it should fail.

### Mocks (preview)

#### mockFn<Args, Return>()

Create mock conforming to a given signature.

##### Example:

```typescript
const mock = mockFn<[string], number>()
```

#### expectedCall(...args)

Configure expected call, any unexpected call will throw. Args can include
matchers.

#### returns(value)

Return value on expected call

#### executes(fn)

Execute any code on expected call

#### throws(error)

Throw value on expected call

#### resolvesTo(value)

Syntactic sugar to `returns(Promise.resolve(value))`

#### rejectsWith(error)

Syntactic sugar to `returns(Promise.reject(error))`
