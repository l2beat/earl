---
title: Step by step guide
---

Let's setup **mocha** with **earl** and write our first assertion. I will assume
in this guide that you use TypeScript but **earl** works with JavaScript as
well.

First install dependencies:

```sh
npm install --save-dev typescript ts-node mocha @types/mocha earljs
```

**Note**: it's `earljs` not `earl`.

## Setup TypeScript

Here's a minimal _tsconfig.json_:

```json
{
  "compilerOptions": {
    "lib": ["ES2018"],
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "target": "ES2015",
    "esModuleInterop": true,
    "sourceMap": true
  },
  "include": ["src", "test"]
}
```

## Function under tests

Lets create simple function that we are going to test:

_src/sum.ts_:

```typescript
export function sum(a: number, b: number): number {
  return a + b
}
```

## Configure mocha

First, lets deal with mocha setup. Create config file in the root of the
project:

_.mocharc.js_:

```js
module.exports = {
  require: [
    'ts-node/register/transpile-only', // required to run TypeScript code
  ],
  extension: ['ts'],
  watchExtensions: ['ts'],
  spec: ['test/**/*.test.ts'],
}
```

## Write our first test case

Lets create our first test suite. I like to mirror directory structure of `src/`
inside my `test/` directory so that's what we are going to do:

_test/sum.test.ts_:

```typescript
import { expect } from 'earljs'
import { sum } from '../src/sum'

describe('sum', () => {
  it('sums numbers', () => {
    const actual = sum(2, 2)

    expect(actual).toEqual(4)
  })
})
```

Last thing is to create `package.json` test script:

```js
// ...
scripts: {
  "test": "mocha"
}
```

Run `npm test` and _voilà_! You just wrote your first test case using **earl**!

Make it fail by change expected value to `5`. You should see error message
clearly explaining problem: `Error: 4 not equal to 5`.

Sometimes you might want to match not exact number but rather whole range of
values - that's what matchers are for. Rewrite your assertion to:

```typescript
expect(actual).toEqual(expect.numberCloseTo(4, 2))
```

This assertion will match every number "close to" `4` in radius of `2`. In this
case it doesn't really make sense since addition will always give us accurate
results but **earl** comes with many different matchers which can be very
helpful.

Now let's try doing something fun. Autofix is a unique feature which helps you
to write tedious assertions for you. In our test case lets remove expected value
`4` like this:

```typescript
expect(actual).toEqual()
```

and rerun tests. You should see that expected value was written automatically
for us! **Earl** was able to insert missing value during test execution. For
this to happen we need source maps and that's why we enabled them in
`tsconfig.json`.

Autofix is powerful feature but remember to always manually review written
values to avoid surprises. And don't worry, autofix won't run on CI.
