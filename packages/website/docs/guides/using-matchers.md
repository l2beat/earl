---
title: Using matchers
editLink: true
---

# {{ $frontmatter.title }}

Matchers are used to make more complex assertions in combination with validators, especially when dealing with dynamic or non-deterministic values. They are never used alone, but rather within validators like toEqual. Every matcher has a corresponding validator.

## Matchers for types

Matchers can be used to verify the types of values:

```ts
expect({
  answer: 42,
  question: 'everything',
  book: {
    title: "The Hitchhiker's Guide to the Galaxy",
  },
}).toEqual({
  answer: expect.a(Number),
  question: expect.a(String),
  book: expect.anything(),
})
```

Some interesting matchers for types include:

- `expect.a(type)`
- `expect.anything()`
- `expect.defined()`
- `expect.nullish()`
- `expect.falsy()`
- `expect.truthy()`

## Matchers for numbers

Matchers are very useful for comparing numbers, especially when you don't know the exact value. For example, you might want to check if a number is between two other numbers, or if it is close to another number. Earl provides a few matchers for this task:

- `expect.between(min, max)`
- `expect.closeTo(target, delta)`
- `expect.greaterThan(target)`
- `expect.greaterThanOrEqual(target)`
- `expect.lessThan(target)`
- `expect.lessThanOrEqual(target)`

All of them except `expect.closeTo` support both numbers and bigints.

Here's an example of how to use them:

```ts
expect({ x: 420, y: 69 }).toEqual({
  x: expect.greaterThan(100n),
  y: expect.closeTo(70, 2),
})
```

## Matchers for strings and containers

Containers and strings are also very common types that you might want to compare. In earl working with those values is very easy:

```ts
expect({
  name: 'John',
  friends: new Set(['Alice', 'Bob', 'Charlie']),
  enemies: [],
}).toEqual({
  name: expect.regex(/^[A-Z][a-z]+$/),
  friends: expect.includes('Alice', 'Bob'),
  enemies: expect.empty(),
})
```

Some interesting matchers for strings and containers include:

- `expect.empty()`
- `expect.includes(...values)`
- `expect.length(length)`
- `expect.property(key, value?)`
- `expect.regex(regex)`

## Custom matchers

Earl provides more matchers than the ones listed above. To see the full list, please check out the [API reference](/api/api-reference).

If you find that you want to check something that Earl doesn't provide a matcher for, you can easily work around this by using `expect.satisfies(predicate)` or by registering your own matcher.

```ts
expect({ x: 1, y: 2 }).toEqual({
  x: 1,
  y: expect.satisfies(myCustomCheck),
})
```

Registering a matcher is explained in the [Extending Earl](/advanced/extending-earl) advanced guide.
