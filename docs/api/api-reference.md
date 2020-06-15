---
id: api-reference
title: API reference
---

### Validators

- `toEqual(object)` - performs deep equality check, ensures type equality,
  supports additional matchers. If no arg is provided it will be autofixed.
- `toLooseEqual(object)` - like toEqual but without type checking. If no arg is
  provided it will be autofixed.
- `toThrow(expected)` - checks if expected error was throws. It uses the same
  equality logic as toEqual. Use `expect.error()` matcher to quickly match
  errors. Requires checked value to be a parameterless function. If no arg is
  provided it will be autofixed.
- `toBeRejected(expected)` - checks if promise was rejected with a expected
  value. It uses the same equality logic as toEqual. Use `expect.error()`
  matcher to quickly match errors. Autofix currently not available.
- `toBeExhausted()` - checks if given mock is exhausted. Works both with strict
  and loose mocks.

### Matchers

Matchers are used to match range of values. These should be combined with
validators like `toEqual` or strictMocks's `expectedCall`.

- `anything()` - matches anything
- `a(class)` - matches any instance of a class. Works as expected with
  primitives like String, Number etc. Use `a(Object)` to match any object (won't
  match null). Note: it doesn't work with TypeScript types because they are
  erased from the output - you need a JS class.
- `stringMatching(substring | regexp)` - matches any string containing given
  substring or matching given pattern
- `numberCloseTo(expected: number, delta: number)` - matches any number within
  proximity of expected number
- `error(msg: string)` - matches any error with matching error message. Msg can
  be a matcher
- `error(errorCls, msg?: string)` - matches any error which is instance of
  errorCls with matching error message

### Modifiers

- `not` - will make expectation fail when it should succeed and succeed when it
  should fail
