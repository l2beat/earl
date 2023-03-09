---
title: Getting started
editLink: true
---

# {{ $frontmatter.title }}

**Earl** is a ergonomic, modern and type-safe assertion library written in
TypeScript. You might be familiar with similar libraries like: _chai_ or
_assert_. **Earl** should be used with a test runner like _mocha_, _ava_ or
_tape_.

To install **earl** run:

```sh
npm install --save-dev earljs
```

With **earl** your assertions looks like this:

```typescript
import { expect } from 'earljs'

expect(response).toEqual({
  body: { trimmed: true, timestamp: expect.a(String) },
})
```

We call functions like `toEqual` validators (well because they validate
stuff...) and functions like `expect.a` matchers, you guessed it, because they
match values. Matchers can be used to match whole ranges of values and are very
important piece of **earl** ecosystem.

You can read more about those concepts in
[Core Concepts](/introduction/core-concepts) chapter. But for now lets do a step
by step guide and write a first test case using **mocha** and **earl**!
