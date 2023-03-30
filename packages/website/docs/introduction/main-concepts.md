---
title: Main concepts
editLink: true
---

# {{ $frontmatter.title }}

## Validators

Validators form the core of Earl. They are the functions you call each time you want to assert something during testing.

A prime example of a validator is `toEqual`, which compares the provided value with the expected value using a deep equality algorithm.

```ts
const value = { foo: 'bar', baz: Math.random() }

expect(value).toEqual({
  foo: 'bar',
  // this is a matcher, continue reading to learn about them
  baz: expect.a(Number),
})
```

Another helpful example is `toThrow`, which can be used to check for errors:

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

Matchers work alongside validators to allow more complex assertions that can handle dynamic or unknown values. Instead of asserting everything about a specific part of the tested value, you can use a matcher to assert only that the value is of a certain type or has a certain quality.

For instance, you can use `expect.a(Number)` to assert that the value is a number or `expect.length(5)` to assert that the value has a length of 5.

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

When testing complex code, you'll inevitably encounter the need to substitute some existing functions or objects with mocks. Fortunately, Earl provides a simple API for creating mocks and a set of built-in validators for asserting that a mock was called with the expected arguments.

Here's an example of how you can use mocks:

```ts
import { expect, mockObject } from 'earl'

interface IApi {
  getUser(id: number): Promise<User>
  getOrders(userId: number): Promise<Order[]>
}

// you only mock the values you care about, the rest error on access
const api = mockObject<IApi>({
  getUser: async (id) => ({ id, name: 'John', email: 'john@mail.com' }),
})

const user = await api.getUser(1)
expect(user.name).toEqual('John')
expect(api.getUser).toHaveBeenOnlyCalledWith(1)
```

You can read more about mocks in the [Using mocks](/guides/using-mocks) guide or browse the [API reference](/api/validators).

## Snapshots

Sometimes the values you want to test are quite complex, or their actual content is less important than the fact that they are correct. In these cases, you can use snapshots to assert that the value matches a previously stored value.

Earl has a bit different approach to snapshots than other framework so make sure to check out the [Snapshot testing](/guides/snapshot-testing) guide or browse the [API reference](/api/validators).

## Extensions

Earl is designed to be extensible. You can extend Earl with your own validators and matchers. This is a feature intended for advanced users. Read more about it in the [Extending Earl](/advanced/extending-earl) guide or browse the [API reference](/api/extending).
