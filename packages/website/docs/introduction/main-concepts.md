---
title: Main concepts
editLink: true
---

# {{ $frontmatter.title }}

## Validators

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

You can read more about the available validators in the [Basic assertions](/guides/basic-assertions) guide or browse the [API reference](/api/validators).

## Matchers

Matchers work with validators to allow more complex assertions that can handle
dynamic or unknown values. Instead of asserting everything about some part
of the tested value, you can use a matcher to assert only that the value is of
a certain type, or has a certain quality.

For example, you can use `expect.a(Number)` to assert that the value is a
number, or `expect.length(5)` to assert that the value has a length of 5.

Here you can see some matchers in action:

```ts
expect(registeredUser).toEqual({
  id: expect.a(Number),
  name: expect.notEmpty(),
  email: expect.includes('@'),
  password: expect.length(expect.greaterThanOrEqual(8)),
})
```

You can read more about matchers in the [Using matchers](/guides/using-matchers) guide or browse the [API reference](/api/matchers).

## Error handling

Earl provides robust support for testing functions and promises that throw errors.

Here's an example of how you can test a function that throws an error:

::: code-group

```ts [index.test.ts]
import { getZipCode, markAsDelivered } from './index'

it('cannot get zip code of a user without an address', () => {
  const user = { name: 'John' }
  expect(() => getZipCode(user)).toThrow('User has no address')
})

it('cannot mark nonexistent order as delivered', async () => {
  await expect(markAsDelivered(1)).toBeRejectedWith('Order not found')
})
```

```ts [index.ts]
export function getZipCode(user: User) {
  if (!user.address) {
    throw new Error('User has no address')
  }
  return user.address.zipCode
}

export async function markAsDelivered(orderId: number) {
  const order = await getOrder(orderId)
  if (!order) {
    throw new Error('Order not found')
  }
  await saveOrder({ ...order, status: 'delivered' })
}
```

:::

You can read more about errors in the [Handling errors](/guides/handling-errors) guide or browse the [API reference](/api/validators).

## Mocks

## Snapshots

## Extensions

Earl is designed to be extensible. You can extend Earl with your own validators and matchers. This is a feature intended for advanced users. Read more about it in the [Extending Earl](/advanced/extending-earl) guide.
