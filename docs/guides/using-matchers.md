---
title: Using matchers
---

Matchers allow matching whole ranges of values rather than just one literal,
they can be combined with other validators or used with mocks. Let's take a look
at few different examples.

## String related matchers

Imagine that we want to match any string in our test case. We can use a generic
`a(Class)` matcher, matching any instance of a given class.

```typescript
import { expect } from 'earljs'

expect('abc').toEqual(a(String))
```

`a(Class)` works with builtin types like strings, numbers etc as well as custom
classes. It's smart enough to leverage `typeof` check for builtins - so you
don't have to worry about that :)

What if you don't want to match any string but rather a string containing
another string or better, matching some pattern?

```typescript
import { expect } from 'earljs'

// match any string containing "Doe"
expect('John Doe').toEqual(expect.stringMatching('Doe'))

// match any string containing Doe or doe
expect('John Doe').toEqual(expect.stringMatching(/[Dd]oe/))
```

## Composing matchers

The real power of matchers comes from the fact that they be part of the bigger
pattern.

```typescript
import { expect } from 'earljs'

// match any John
expect({ name: 'John', surname: 'Doe' }).toEqual({
  name: 'John',
  surname: expect.a(String),
})
```

If you're familiar with pattern matching from languages like Scala or OCaml,
**earl**'s matchers are designed in a similar way.

Few other examples:

```typescript
// use error matcher combined with string matcher to only match
// errors containing "unexpected" word in their message
expect(() => {
  throw new Error('Totally unexpected error! :(')
}).toThrow(expect.stringMatching('unexpected'))
```
