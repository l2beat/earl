---
title: API Reference
editLink: false
outline: deep
---

# {{ $frontmatter.title }}

## Validators

### **`.toBeA<C extends NewableOrPrimitive>(type: C): void`**

Validates an instance of a provided class or a primitive type. It is
compatible with built-in types like strings, numbers, and dates.

Using this validator is recommended when you don't care about the exact
value as long as it matches a given type.

If you want to match a deep nested values, use matcher `expect(...).toEqual(key: expect.A(Date)})`
instead.
  
*Parameters:*

- `type` - The class or primitive constructor to match against.
  
*Examples:*


```ts
// Primitives
expect(Math.random()).toToBeA(Number)

// Classes
expect(new Employee('John Doe', 42)).toToBeA(Employee)
expect(new Date('1990-01-01')).toToBeA(expect.a(Date))
```

## Matchers

### **`expect.a<T extends NewableOrPrimitive>(type: T): never`**

Matches an instance of a provided class or a primitive type. It is
compatible with built-in types like strings, numbers, and dates.

Using this matcher is recommended when you don't care about the exact
value as long as it matches a given type.

If you want to match a top level value, use `expect(...).toBeA(type)`
instead.
  
*Parameters:*

- `type` - The class or primitive constructor to match against.
  
*Examples:*


```ts
// Primitives
expect({ foo: Math.random() }).toEqual({ foo: expect.a(Number) })

// Classes
expect({
  employee: new Employee('John Doe', 42),
  birthday: new Date('1990-01-01'),
}).toEqual({
  employee: expect.a(Employee),
  birthday: expect.a(Date),
})
```
### **`expect.anything(): never`**

Matches any value.

Using this matcher is recommended when you want to ensure that a key is
present on an object, but you don't care about its value.
  
*Examples:*


```ts
const person = findPerson('John Doe')
expect(person).toEqual({
  name: 'John Doe',
  favoriteThing: expect.anything()
})
```
### **`expect.between(min: number | bigint, max: number | bigint): never`**

Matches numbers that are between the two numbers.
The range is `[min, max]`, inclusive on both sides.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeBetween(min, max)` instead.
  
*Parameters:*

- `min` - The minimum value, inclusive.
- `max` - The maximum value, inclusive.
  
*Examples:*


```ts
const location = getLatLon()
expect(location).toEqual({
  lat: expect.between(-90, 90),
  lon: expect.between(-180, 180),
})
```
### **`expect.closeTo(target: number, delta: number): never`**

Matches numbers that are close to the target value. The range is
`[target - delta, target + delta]`, inclusive on both sides.

Works only for numbers and not for bigints.

If you want to match a top level value, use
`expect(...).toBeCloseTo(target, delta)` instead.
  
*Parameters:*

- `target` - The number to aim for.
- `delta` - The maximum difference between the values.
  
*Examples:*


```ts
const vector = getApproximateStrikeTarget()
expect(vector).toEqual({
  x: expect.closeTo(420, 0.001),
  y: expect.closeTo(69, 0.001),
})
```
### **`expect.defined(): never`**

Matches values that are not `undefined`.

If you want to match a top level value, use `expect(...).toBeDefined()`
instead.
  
*Examples:*


```ts
const result = await fetchStockPrices('BANANA', 'KIWI')
expect(result).toEqual({
  BANANA: expect.defined(),
  KIWI: expect.defined(),
})
```
### **`expect.empty(): never`**

Matches empty strings, arrays, sets and maps.

If you want to match a top level value, use `expect(...).toBeEmpty()`
instead.
  
*Examples:*


```ts
const sadGuy = await people.findWhere({ friendCount: 0 })
expect(sadGuy).toEqual({
  name: 'John Doe',
  friends: expect.empty(),
})
```
### **`expect.falsy(): never`**

Matches falsy values, as defined by:
https://developer.mozilla.org/en-US/docs/Glossary/Falsy

You can also use its sister matcher, `truthy`, to match the opposite.

If you want to match a top level value, use `expect(...).toBeFalsy()`
instead.
  
*Examples:*


```ts
const doggy = dogApi.getDog('Waffles')
expect(doggy).toEqual({
  name: 'Waffles',
  // Waffles is a stray, we don't know the date :(
  birthday: expect.falsy(),
})
```
### **`expect.greaterThan(target: number | bigint): never`**

Matches numbers that are greater than the given target.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeGreaterThan(target)` instead.
  
*Parameters:*

- `target` - The target value to compare to.
  
*Examples:*


```ts
expect({
  salary: 100_000,
  bonus: 10_000,
}).toEqual({
  salary: expect.greaterThan(50_000),
  bonus: expect.greaterThan(5_000),
})
```
### **`expect.greaterThanOrEqual(target: number | bigint): never`**

Matches numbers that are greater than or equal to the given target.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeGreaterThanOrEqual(target)` instead.
  
*Parameters:*

- `target` - The target value to compare to.
  
*Examples:*


```ts
expect({
  salary: 100_000,
  bonus: 5_000,
}).toEqual({
  salary: expect.greaterThanOrEqual(50_000),
  bonus: expect.greaterThanOrEqual(5_000),
})
```
### **`expect.includes(...items: any[]): never`**

Matches an array, Set or iterable that includes the given item or items.
Also matches a string that includes the given substring or substrings.

If you want to match a top level value, use
`expect(...).toInclude(...items)` instead.
  
*Parameters:*

- `items` - Items or matchers to look for. When the value is a string, all items must be strings too.
  
*Examples:*


```ts
expect({
  numbers: [1, 2, 3],
  mixed: [1, "foo", false],
  string: "I like pancakes",
}).toEqual({
  numbers: expect.includes(1, 2),
  mixed: expect.includes(1, expect.a(String)),
  string: expect.includes("pancakes"),
})
```
### **`expect.integer(): never`**

Matches numbers that are integers.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeAnInteger()` instead.
  
*Examples:*


```ts
const counts = getParticleCounts()
expect(counts).toEqual({
  min: 0,
  max: expect.integer(),
  median: expect.integer(),
})
```
### **`expect.length(length: number): never`**

Matches an array, string or any object with a `length` property that has the given length.

If you want to match a top level value, use
`expect(...).toHaveLength(length)` instead.
  
*Parameters:*

- `length` - The expected array length. Can be a matcher.
  
*Examples:*


```ts
expect({
  numbers: [1, 2, 3],
  letters: 'abcdef',
}).toEqual({
  numbers: expect.length(3),
  letters: expect.length(expect.greaterThan(3)),
})
```
### **`expect.lessThan(target: number | bigint): never`**

Matches numbers that are less than the given target.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeLessThan(target)` instead.
  
*Parameters:*

- `target` - The target value to compare to.
  
*Examples:*


```ts
expect({
  salary: 100_000,
  bonus: 10_000,
}).toEqual({
  salary: expect.lessThan(200_000),
  bonus: expect.lessThan(20_000),
})
```
### **`expect.lessThanOrEqual(target: number | bigint): never`**

Matches numbers that are less than or equal to the given target.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeLessThanOrEqual(target)` instead.
  
*Parameters:*

- `target` - The target value to compare to.
  
*Examples:*


```ts
expect({
  salary: 100_000,
  bonus: 20_000,
}).toEqual({
  salary: expect.lessThanOrEqual(200_000),
  bonus: expect.lessThanOrEqual(20_000),
})
```
### **`expect.notEmpty(): never`**

Matches strings, arrays, sets and maps that aren't empty.

If you want to match a top level value, use `expect(...).not.toBeEmpty()`
instead.
  
*Examples:*


```ts
const happyGuy = await people.findWhere({ friendCount: 'max' })
expect(happyGuy).toEqual({
  name: 'John Doe',
  friends: expect.notEmpty(),
})
```
### **`expect.notNullish(): never`**

Matches values that are not nullish, i.e. values that are not `null`
or `undefined`.

If you want to match a top level value, use
`expect(...).not.toBeNullish()` instead.
  
*Examples:*


```ts
const result = await fetchStockPrices('BANANA', 'KIWI')
expect(result).toEqual({
  BANANA: expect.notNullish(),
  KIWI: expect.notNullish(),
})
```
### **`expect.nullish(): never`**

Matches `null` and `undefined`.

If you want to match a top level value, use `expect(...).toBeNullish()`
instead.
  
*Examples:*


```ts
const result = await flight.getPassenger('17A')
expect(result).toEqual({
  name: 'John Doe',
  seat: '17A',
  insurancePolicy: expect.nullish(),
})
```
### **`expect.property(key: string, value?: unknown): never`**

Matches objects for which a given key exists. Optionally checks the
property value.
  
*Parameters:*

- `key` - The expected property key.
- `value` - (optional) The expected property value.
  
*Examples:*


```ts
const events = await getLatestEvents({ limit: 3 })
expect(events).toEqual([
  expect.property('pending', true),
  expect.property('finalizedAt'),
  expect.property('finalizedAt'),
])
```
### **`expect.regex(regex: RegExp): never`**

Matches strings that match a given regular expression.

If you want to match a top level value, use
`expect(...).toMatchRegex(regex)` instead.
  
*Parameters:*

- `regex` - The regular expression to test the matched values.
  
*Examples:*


```ts
const contact = await customer.getUSContactInfo()
expect(contact).toEqual({
  state: expect.regex(/^[A-Z]{2}$/),
  zipCode: expect.regex(/^\d{5}$/),
  phoneNumber: expect.regex(/^\d{3}-\d{3}-\d{4}$/),
})
```
### **`expect.safeInteger(): never`**

Matches numbers that are integers between Number.MIN_SAFE_INTEGER nad Number.MAX_SAFE_INTEGER.

Works for both numbers and bigints.

If you want to match a top level value, use
`expect(...).toBeASafeInteger()` instead.
  
*Examples:*


```ts
const counts = getExperimentStats()
expect(counts).toEqual({
  min: 0n,
  max: expect.safeInteger(),
  median: expect.safeInteger(),
})
```
### **`expect.satisfies(predicate: (value: unknown) => boolean): never`**

Matches values for which the predicate returns a truthy value.

Usually other matchers are more appropriate, but this can be useful if
you are testing something custom.

If you want to match a top level value, use
`expect(...).toSatisfy(predicate)` instead.
  
*Parameters:*

- `predicate` - The function for checking values.
  
*Examples:*


```ts
function isShark(value: unknown) {
  return value instanceof Fish && value.species === 'shark'
}
expect(crazyZoologist).toEqual({
  name: 'John Doe',
  pet: expect.satisfies(isShark),
})
```
### **`expect.schema(schema: ZodSchema): never`**

Matches values conforming to a zod schema.

If you want to match a top level value, use
`expect(...).toMatchSchema(schema)` instead.
  
*Parameters:*

- `schema` - The zod schema to use.
  
*Examples:*


```ts
import * as z from 'zod'
const product = await getLatestProduct()
expect(product).toEqual({
  name: 'Turbocharger 9000',
  uuid: expect.schema(z.uuid()),
  pricing: expect.schema(z.object({
    price: z.number().positive(0),
    currency: z.string().length(3),
  })),
})
```
### **`expect.subset(subset: object): never`**

Matches an object containing the given key value pairs.
  
*Parameters:*

- `subset` - The key value paris to match against.
  
*Examples:*


```ts
const response = await api.get('/users/me')
expect(response).toEqual({
  success: true,
  data: expect.subset({
    name: 'John Doe',
    age: 42,
  }),
})
```
### **`expect.truthy(): never`**

Matches truthy values, as defined by:
https://developer.mozilla.org/en-US/docs/Glossary/Truthy

You can also use its sister matcher, `falsy`, to match the opposite.

If you want to match a top level value, use `expect(...).toBeTruthy()`
instead.
  
*Examples:*


```ts
const kitty = catApi.getCat('Peanut')
expect(kitty).toEqual({
  name: 'Peanut',
  // they are a happy family, but we don't care about the details
  mom: expect.truthy(),
  dad: expect.truthy(),
})
```

## Mocks

### **`function mockFn<F extends (...args: any) => any>(defaultImpl?: F): MockOf<F>`**

Creates a mock conforming to a given signature.
  
*Examples:*


```ts
const mock1 = mockFn<[number, string], number>()
const mock2 = mockFn<(a: number, b: string) => number>()
```
### **`function mock(...args: A): R`**

Calls the mock function.
  
### **`mock.calls: MockCall<A, R>[]`**

An array containing all the performed calls.
  
### **`mock.executes(implementation: (...args: A) => R): Mock<A, R>`**

Sets the underlying implementation of the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `implementation` - function to execute.
  
### **`mock.executesOnce(implementation: (...args: A) => R): Mock<A, R>`**

Schedules the mock to use the provided implementation the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `implementation` - function to execute.
  
### **`mock.getOneTimeOverridesLength(): number`**

Returns the number of remaining one time overrides, `e.g. given(...).returnsOnce(...)`.
  
### **`mock.getQueueLength(): number`**

Returns the number of remaining calls, e.g. `returnsOnce`.
  
### **`mock.given<B extends A>(...args: B): MockGiven<A, R, B>`**

Specifies a different behavior when other arguments are given
  
*Parameters:*

- `args` - arguments to match.
  
### **`mock.isExhausted(): boolean`**

Checks if all the expected calls to the mock have been performed.
  
### **`mock.rejectsWith(error: any): Mock<A, R>`**

Sets the error rejected by calls to the Mock.
  
*Parameters:*

- `error` - error to be thrown.
  
### **`mock.rejectsWithOnce(error: any): Mock<A, any>`**

Schedules the mock to reject with value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  
### **`mock.resolvesTo(value: Awaited<R>): Mock<A, R>`**

Sets the return value wrapped in Promise.resolve of calls to the Mock.
  
*Parameters:*

- `value` - value to be returned.
  
### **`mock.resolvesToOnce(value: Awaited<R>): Mock<A, R>`**

Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
### **`mock.returns(value: R): Mock<A, R>`**

Sets the return value of calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `value` - value to be returned.
  
### **`mock.returnsOnce(value: R): Mock<A, R>`**

Schedules the mock to return a value the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `value` - value to be returned.
  
### **`mock.throws(error: any): Mock<A, R>`**

Sets the error thrown by calls to the Mock.
Overrides any previous configuration.
  
*Parameters:*

- `error` - error to be thrown.
  
### **`mock.throwsOnce(error: any): Mock<A, R>`**

Schedules the mock to throw an error the next time it's called.
If anything is already scheduled it will be used first.
  
*Parameters:*

- `error` - error to be thrown.
  