---
title: Getting started
editLink: true
---

# {{ $frontmatter.title }}

## Installation

Earl is an ergonomic, modern and type-safe assertion library written in
TypeScript. You might be familiar with similar libraries like: _chai_ or
_assert_. Earl should be used with a test runner like _mocha_ or _uvu_.

To install Earl run:

::: code-group

```sh [npm]
npm install --save-dev earl
```

```sh [yarn]
yarn add --dev earl
```

```sh [pnpm]
pnpm add --save-dev earl
```

:::

After that you can import **earl** in your test files and you are ready to go!

If your project is already set up, you can skip the next section and go straight
to learning the [Main concepts](/introduction/main-concepts).

If you want us to hold your hand and walk you through the project setup
read along.

## Bootstrapping a new project

To start a new project we're going to create a new directory for it and add a
`package.json` file.

::: code-group

```json [package.json]
{
  "name": "my-project",
  "private": true,
  "scripts": {
    "build": "tsc",
    "test": "mocha"
  }
}
```

:::

If you're going to use git you can also initialize the repository

```sh
git init
```

Make sure to also create a `.gitignore` file with the following contents:

::: code-group

```sh [.gitignore]
node_modules
dist
```

:::

## Installing TypeScript

**Earl** is written in TypeScript and encourages you to use it as well. By
using TypeScript you can leverage the type annotations to provide safety and
a smoother developer experience.

To install TypeScript run:

::: code-group

```sh [npm]
npm install --save-dev typescript
```

```sh [yarn]
yarn add --dev typescript
```

```sh [pnpm]
pnpm add --save-dev typescript
```

:::

Next, create the `tsconfig.json` file in the root of your project.

::: info
The following setup is extremely minimal. Please refer to the
[TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
for information on how to configure your project fully.
:::

::: code-group

```jsonc [tsconfig.json]
{
  "compilerOptions": {
    // access recent language features
    "lib": ["ES2020"],
    "target": "ES2020",
    // enable strict typechecking rules
    "strict": true,
    // help TypeScript find earl
    "moduleResolution": "node",
    // place compilation output in the dist folder
    "outDir": "dist"
  }
}
```

:::

## Installing mocha

**Earl** is designed to be used with a test runner like _mocha_ or _uvu_. In
this tutorial we're going to use mocha.

We could install just mocha, but we're going to grab a few more packages to
help us work with TypeScript.

::: code-group

```sh [npm]
npm install --save-dev mocha ts-node @types/mocha @types/node
```

```sh [yarn]
yarn add --dev mocha ts-node @types/mocha @types/node
```

```sh [pnpm]
pnpm add --save-dev mocha ts-node @types/mocha @types/node
```

:::

Next, we're going to configure mocha to work with TypeScript. Create a
`.mocharc.js` file in the root of your project.

::: code-group

```js [.mocharc.js]
// Ensure that the NODE_ENV is set to test
process.env.NODE_ENV = 'test'
module.exports = {
  // We need to tell mocha where to find our test files
  spec: 'src/**/*.test.ts',
  // We're going to use ts-node to transpile our code on the fly
  require: 'ts-node/register/transpile-only',
  // Finally, we're telling mocha to use the ts extension instead of js
  watchExtensions: 'ts',
  extension: 'ts',
}
```

:::

## Writing tests

After all that setup it is finally time for some action. Create a `src` folder
with two files in it: `math.ts` and `math.test.ts`.

::: code-group

```ts [src/math.ts]
export function add(a: number, b: number) {
  return a + b
}
```

:::

::: code-group

```ts [src/math.test.ts]
import { expect } from 'earl'
import { add } from './math'

describe(add.name, () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
```

:::

If you have followed our setup instructions, your repository should look like
this:

```
node_modules/
src/
  math.ts
  math.test.ts
.gitignore
.mocharc.js
package.json
tsconfig.json
```

Time for the grand finale. Run our test script:

::: code-group

```sh [npm]
npm test
```

```sh [yarn]
yarn test
```

```sh [pnpm]
pnpm test
```

:::

Here's the output you should see if everything went well:

```
  add
    ✔ adds two numbers


  1 passing (6ms)
```
