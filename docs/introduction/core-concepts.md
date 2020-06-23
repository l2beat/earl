---
title: Core concepts
---

### Validators

Validators are basically more powerful assertions like `toEqual` or `toThrow`.

### Autofix

Autofix is a ability of (almost) all validators to write missing assertion for
you. When expected value is omitted, **earl** will fill it out with actual
value.

### Matchers

Matchers are used with validators to match more than single value. They are
attached directly to `expect` object. For example with `expect.anything()` you
can match any value.

Combine it with validator like `beEqual` to create not very useful assertion
like ;) :

```typescript
expect(something).toEqual(expect.anything())
```

### Modifiers

Modifiers change the way how assertion behave. Currently only modifier is `not`
which negates assertion:

```typescript
expect(something).not.toEqual(expect.anything())
```
