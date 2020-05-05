# Earl

Ergonomic, modern, type-safe and test runner agnostic assertion library

**Chai** replacement, brings good parts of Jest back to Mocha (or your favorite test runner)

## Features

### AutoFix

Automatically fix expected (if omitted) values to match actual. Option to force fix existing values. Works with different matchers.

Implementation requires stack traces with correct sourcemaps - available in 99% environments. This feature is inspired by Jest's inline snapshots.

```js
expect(5).toEqual();
// becomes after run
expect(5).toEqual(5);
```

### Type-safe (support for TypeScript)

```js
expect(5).toEqual("abc"); // errors during compile time
```

### Deep eq by default

Turns out that 99% of the time this is what you want. For remaining cases use `shallow.eq` matcher.

```js
expect({ abc: "abc" }).toEqual({ abc: "abc" }); // deep eq by default
```

### Matchers as values

Matchers can be values like `expect.anything()` and can be combine for example with `toEqual`. Allowing, for example to easily assert not fully deterministic objects. Unlike `chai-subset` using this asserts much more info about actual object shape.

```js
expect({
  abc: "abc",
  timestamp: "05/02/2020 @ 8:09am (UTC)",
}).toEqual({ abc: "abc", timestamp: expect.anyString() });
```

### Batteries included

Reimplements most common `chai` matchers and make them part of the core.

Sinon like features out of the box? or at least support for sinon.

Maybe support for type-level tests in TS?

### Extendable

Chai style plugins with additional matchers etc. Matchers can (and should!) implement support to autofix.

### Driven by you

Yes you! This document presents current best thinking behind this project. Do you want to propose a feature? Don't hesitate to create issue or reach out me directly on twitter (@krzkaczor)
