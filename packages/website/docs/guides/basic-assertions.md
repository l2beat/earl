---
title: Basic assertions
editLink: true
---

# {{ $frontmatter.title }}

## Checking equality

Like any other testing library, Earl supports checking for value equality. In fact, Earl has three validators for this task, namely `toEqual`, `toLooseEqual`, and `toExactlyEqual`.

Out of the three, `toEqual` is the one you will use most of the time. It is used for objects and primitives, employs a deep equality algorithm, checks prototypes, and supports matchers. It is also type-safe, so you can't compare a number to a string.

Sometimes you might want to compare two objects without checking prototypes or types. In that case, you can use `toLooseEqual`. It is a version of `toEqual` that is not type-safe and doesn't care about prototypes. Like `toEqual`, it also supports matchers.

Finally, if you want to check for reference equality, you can use `toExactlyEqual`. It uses a strict equality check, and we recommend only using it for objects, as for primitives it works the same as `toEqual`.

Here are some examples of the different cases:

```ts
class Vector {
  constructor(public x: number, public y: number) {}
}

// deeply check values, TypeScript types and prototypes
expect(new Vector(1, 2)).toEqual(new Vector(1, 2))

// only deeply check values
expect(new Vector(1, 2)).toLooseEqual({ x: 1, y: 2 })

// only check reference equality
const v = new Vector(1, 2)
expect(v).toExactlyEqual(v)
```

To learn about matchers check out the [Using matchers](/guides/using-matchers) guide.

## Checking types

Earl also provides a few validators for checking types. The most common one is `toBeA`, which checks if the value is an instance of the given constructor. It also works for primitives; for example, passing Number checks if the value is a number. Alongside `toBeA`, Earl also provides `toBeFalsy`, `toBeTruthy`, and `toBeNullish`.

Here's an example of how to use them:

```ts
expect(1).toBeA(Number)
expect(new Date()).toBeA(Date)

expect('').toBeFalsy()
expect('foo').toBeTruthy()

expect(null).toBeNullish()
expect(undefined).toBeNullish()
```

## Comparing numbers

A lot of the testing that we do comes down to comparing numbers. Earl provides a few validators for this task, namely `toBeCloseTo`, `toBeBetween`, `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan`, and `toBeLessThanOrEqual`. All of them, except `toBeCloseTo`, support both numbers and bigints.

Working with number validators is really easy:

```ts
// 0.30000000000000004
expect(0.1 + 0.2).toBeCloseTo(0.3, 0.0001)

// you can freely mix numbers and bigints
expect(32.5).toBeBetween(16n, 64n)

expect(1).toBeGreaterThan(0)
expect(5).toBeGreaterThanOrEqual(5)
expect(10).toBeLessThan(20)
expect(50).toBeLessThanOrEqual(50)
```

## Inspecting containers

In TypeScript, there are many options for storing groups of values. Earl makes working with them easy by providing a few validators for them. Here's a list of all the validators that Earl provides for containers:

1. `toBeEmpty`, which checks if the container is empty. It works for sets, maps, arrays, and strings.
2. `toHaveLength`, which checks if the container has the given length. It works for strings and arrays. It also supports matchers.
3. `toInclude`, which checks if the container includes the given value or values. It works for sets, maps, arrays, and strings. It also supports matchers and passing multiple values.
4. `toEqualUnsorted`, which checks if the array has the same values as another array without worrying about the order.

```ts
// Sets
expect(new Set()).toBeEmpty()
expect(new Set([1, 2, 3])).toInclude(2, 3)

// Maps
expect(new Map()).toBeEmpty()

// Arrays
expect([]).toBeEmpty()
expect([1, 2, 3]).toHaveLength(expect.greaterThan(2))
expect([1, 2, 3]).toInclude(2, 3)
expect([1, 2, 3]).toEqualUnsorted([3, 2, 1])

// Strings
expect('').toBeEmpty()
expect('foo').toHaveLength(3)
expect('foo').toInclude('o')
```

## Negating validators

Very often, instead of expecting a validator to pass, we actually want to expect it to fail. Earl makes this easy by providing a `not` property on all validators. This property is a function that returns a new validator that negates the original one.

```ts
expect(1).toEqual(1)
expect(1).not.toEqual(2)
```

## Custom validators

Earl provides more validators than the ones listed above. To see the full list, please check out the [API reference](/api/validators).

If you find that you want to check something that Earl doesn't provide a validator for, you can easily work around this by using `toSatisfy` or by registering your own validator.

```ts
expect(1).toSatisfy(myCustomCheck)
```

Registering a validator is explained in the [Extending Earl](/advanced/extending-earl) advanced guide.
