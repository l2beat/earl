---
id: core-concepts
title: Core Concepts
---

### Validators

Validators are basically assertions for example `toEqual` or `toThrow`.

### Matchers

Matchers are used with validators to match more than single value. They are attached directly to `expect` object. For
example with `expect.anything()` you can match any value.

Combine it with validator like `beEqual` to create not very useful assertion:

```typescript
expect(something).toEqual(expect.anything())
```

### Modifiers

Modifiers change the way how assertion behave. Currently only modifier is `not` which negates assertion:

```typescript
expect(something).not.toEqual(expect.anything())
```
