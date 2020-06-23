---
title: Testing errors
---

Often you want to assert that given operation results in an error being thrown.
In **earl** you will use `toThrow` validator to catch an error and
`expect.error` matcher to easily match exact error shape.

```typescript
import { expect } from 'earljs'

function somethingThatCanThrow() {
  throw new Error('Unexpected error!')
}

expect(() => somethingThatCanThrow()).toThrow(expect.error('Unexpected error!'))
```

When using `toThrow` we require you to pass parameterless function that will be
executed and error will be caught.

Note that toThrow also works great with autofix.
`expect(() => somethingThatCanThrow()).toThrow()` will be autofixed to use
`expect.error` with a proper error message.

## Matching only part of error message

You can combine `expect.error` matcher with other matchers for example to check
if error message matches another string:

```typescript
expect(() => somethingThatCanThrow()).toThrow(
  expect.error(expect.stringMatching('Unexpected')),
)
```

## Expecting any error

```typescript
expect(() => somethingThatCanThrow()).toThrow(expect.anything())
```

## Expect custom error

```typescript
import { expect } from 'earljs'

class HttpError extends Error {
  constructor(private readonly code: number) {
    super(`Http error with code: ${code}`)
  }
}

function somethingThatCanThrow() {
  throw new HttpError(500)
}

expect(() => somethingThatCanThrow()).toThrow(
  expect.error(HttpError, 'Http error with code: 500'),
)
```
