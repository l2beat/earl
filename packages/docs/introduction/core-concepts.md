---
title: Core concepts
---

### Validators

Validators are basically more powerful assertions like `toEqual` or `toThrow`.
All of them support matchers in expected values.

### Matchers

Matchers are used with validators to match more than a single value. They are
attached directly to `expect` object. For example with `expect.anything()` you
can match any value.

Combine it with validator like `beEqual` to create (not very useful) assertion
that works with any value:

```typescript
expect(something).toEqual(expect.anything())
```

Of course matchers can be nested.

Read more about matchers in [Using matchers guide](/docs/guides/using-matchers).

### Modifiers

Modifiers change the way how assertion behave. Currently only modifier is `not`
which negates an assertion:

```typescript
expect(something).not.toEqual(expect.anything())
```
