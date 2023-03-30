---
title: Checking with Zod
editLink: true
---

# {{ $frontmatter.title }}

[Zod](https://github.com/colinhacks/zod/) is a TypeScript-first schema validation library and in recent years its popularity has grown significantly.

As Earl users are also likely to use Zod, we've added a `toMatchSchema` validator and a `schema` matcher. This allows you to easily check values using Zod schemas.

```ts
import * as z from 'zod'
import { expect } from 'earl'

const schema = z.object({
  foo: z.string(),
  bar: z.number(),
})

expect({ foo: 'foo', bar: 1 }).toMatchSchema(schema)

expect([
  { foo: 'one', bar: 1 },
  { foo: 'two', bar: 2 },
]).toEqual([expect.schema(schema), expect.schema(schema)])
```
