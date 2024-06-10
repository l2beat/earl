---
title: Snapshot testing
editLink: true
---

# {{ $frontmatter.title }}

Snapshot testing is a way to test the output of your code by comparing it to a stored snapshot. This is very useful if the output is large, but you want to ensure it doesn't change unexpectedly.

Unlike testing frameworks, Earl is just an assertion library and requires you to provide it with the test context to determine what test is currently running and to select the correct snapshot.

To update snapshots, set the `UPDATE_SNAPSHOTS` environment variable to `true`.

Snapshots are saved in `.snapshot` files in the same directory as the test file. We find that co-locating them with the test files is the most convenient. Earl's snapshot file format is also easily human-readable and produces nice git diffs.

## Usage with mocha

```ts
import { expect } from 'earl'

describe('foo', () => {
  it('matches snapshot', function () {
    // Here we pass the `this` as test context
    expect('foo').toMatchSnapshot(this)
  })
})
```

## Usage with uvu

```ts
import { expect } from 'earl'
import { test } from 'uvu'

test('foo matches snapshot', (ctx) => {
  // Here we pass the `ctx` as test context
  expect('foo').toMatchSnapshot(ctx)
})

test.run()
```

## Usage with node:test

```ts
import { expect } from 'earl'
import { describe, it } from 'node:test'

test('foo matches snapshot', (ctx) => {
  // Here we pass the `ctx` as test context
  expect('foo').toMatchSnapshot(ctx)
})

test.run()
```
