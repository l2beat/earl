---
title: Main concepts
editLink: true
---

# {{ $frontmatter.title }}

### Validators

Validators are core of Earl. They are used every time you want to assert
something during testing.

A great example of a validator is `toEqual` which compares the provided value
with the expected value using a deep equality algorithm.

```ts
const value = { foo: 'bar', baz: Math.random() }

expect(value).toEqual({
  foo: 'bar',
  // this is a matcher, continue reading to learn about them
  baz: expect.a(Number),
})
```

Another great example is `toThrow` which can be used to check for errors:

```ts
function safeDiv(a: number, b: number) {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

expect(() => safeDiv(1, 0)).toThrow('Division by zero')
```

Validators can also be negated using the `not` modifier:

```ts
expect(1).not.toEqual(2)
```

<!-- TODO: read more in a guide about the most important validators -->
<!-- TODO: browse validators API reference -->

### Matchers

<!-- TODO: more info about matchers. -->

Matchers are used with validators to match more than a single value. They are
attached directly to `expect` object. For example with `expect.anything()` you
can match any value.

Combine it with validator like `beEqual` to create (not very useful) assertion
that works with any value:

```typescript
expect(something).toEqual(expect.anything())
```

Of course matchers can be nested.

<!-- TODO: read more in a guide about the most important matchers -->
<!-- TODO: browse matchers API reference -->

<!-- TODO: snapshots -->
<!-- TODO: mocks -->
<!-- TODO: plugins -->
