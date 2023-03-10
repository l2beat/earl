---
title: Testing errors
editLink: true
---

# {{ $frontmatter.title }}

Often you want to assert that a given operation results in an error being
thrown. That's what `toThrow` validator is useful in **earl**:

```typescript
import { expect } from 'earljs'

function somethingThatCanThrow() {
  throw new Error('Unexpected error!')
}

expect(() => somethingThatCanThrow()).toThrow('Unexpected error!')
```

When using `toThrow` we require you to pass parameterless function `() => ...`
that will be executed and error will be caught. It's one of the limitation of
JavaScript but don't worry! As long as you use TypeScript you will get a compile
time error if you forget to do so.

## Matching only part of an error message

You can combine `toThrow` with string matcher to for example to check if error
message matches another string:

```typescript
expect(() => somethingThatCanThrow()).toThrow(expect.stringMatching('Unexpected')
```

## Expecting any error

```typescript
expect(() => somethingThatCanThrow()).toThrow()
```

## Expect a custom error

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
  HttpError,
  'Http error with code: 500',
)
```
