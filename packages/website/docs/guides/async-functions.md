---
title: Async functions
editLink: true
---

# {{ $frontmatter.title }}

In JavaScript you very frequently work with promises and async functions. Here's how
to deal with them in **earl**.

### Successful promises

We don't expose any helpers to work with promises that should successfully
resolve. Instead, we encourage you to use `async/await` syntax:

```typescript
function delay(n: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, n)
  })
}

async function longTermTask(): Promise<number> {
  await delay(1000)
  return 42
}

expect(await longTermTask()).toEqual(42)
```

Note that if you forget `await` TypeScript will warn you about types mismatch
because `toEqual` actual/expected values won't match.

## Rejected promises

For rejected promises we expose simple `toBeRejected` helper.

```typescript
async function longTermTask(): Promise<number> {
  throw new Error('Unexpected error')
}

await expect(longTermTask()).toBeRejected('Unexpected error')
```

In this case we need `await` before `expect` because whole assertion becomes
async. To avoid mistakes enable
[`no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)
eslint rule (it's part of
[TypeSTRICT](https://github.com/krzkaczor/typestrict)).

Other than that `toBeRejected` works exactly the same as `toThrow` so you can
take a look at our [testing errors guide](/guides/testing-errors).
