---
title: Autofix
---

Autofix is the ability of (almost) all validators to write missing assertions
for you. When expected value is omitted, **earl** will fill it out with actual
value.

Let's take a look at example:

```typescript
import { expect } from 'earljs'

class Person {
  constructor(readonly name: string) {}
}

const actual = {
  trimmed: true,
  timestamp: '12345',
  name: 'Alice Duck',
  age: 15,
  nested: {
    b: new Person('Jack'),
    deep: {
      nested: true,
    },
  },
}

expect(response).toEqual()
```

Omitting arguments to validators usually mean that autofix will kick in. When
you run this test, you should see that `.toEqual` will be rewritten to:

```typescript
import { expect } from 'earljs'

class Person {
  constructor(readonly name: string) {}
}

const response = {
  trimmed: true,
  timestamp: '12345',
  name: 'Alice Duck',
  age: 15,
  nested: {
    b: new Person('Jack'),
    deep: {
      nested: true,
    },
  },
}

expect(response).toEqual({
  age: 15,
  name: 'Alice Duck',
  nested: { b: expect.a(Person), deep: { nested: true } },
  timestamp: '12345',
  trimmed: true,
})
```

Expected value was written for us! If you have any problems ensure that you have
source maps enabled. Take a look at
[step by step guide](../introduction/step-by-step-guide) when in doubt.

It's important to note that **earl** currently don't know how to serialize
custom classes thus `expect.a(Person)` - it will fallback to generic
`expect.a(Class)` matcher.

Now if you run this code again, assertion simply passes.

## Best practices

Autofix is quite powerful feature and with a great power comes great
responsibility ;) **You shall always manually review expected values written by
earl makes sense and doesn't assert something plain wrong.** Obviously, autofix
doesn't go well with TDD but it can be useful when writing new tests among
already existing ones.

## Autofix on CI

Autofix won't run on CI so you shouldn't be worried that your unfinished tests
will pass when they shouldn't.

## Limitations

- requires working source maps
- serializing custom classes is not supported at the moment
- autofix won't work with negated assertions using `.not`
- prettier support is missing
