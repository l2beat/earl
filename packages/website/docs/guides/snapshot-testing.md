---
title: Snapshot testing
editLink: true
---

# {{ $frontmatter.title }}

Earl supports snapshots tests. They are different from Jest's in that they don't
rely on hooking into the test runner, but require you to pass `this` to
`toMatchSnapshot`. Currently snapshots testing is only supported in Mocha.

Inline snapshots are not supported.

## Basic usage

```typescript
import { expect } from 'earljs'

describe('snapshots', () => {
  // Note the `function () {` instead of `() => {`
  // This is because we need to pass `this` to `toMatchSnapshot`
  it('works', function () {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(this)
  })
})
```

Matches actual value to a snapshot. The name of the snapshot is derived from the
suite and test case names. A snapshot file will be named `(filename).snapshot` -
e.g. for `candy.test.ts` it will be `candy.test.ts.snapshot`.

If a snapshot doesn't exist, it will be created. If it exists, actual values
will be asserted against it. Set `UPDATE_SNAPSHOTS=true` environment variable to
update snapshots instead. On CI no snapshots will be updated/created.

Multiple snapshots in one test case work as expected.

## Read more

- [Effective snapshot testing (MUST READ)](https://kentcdodds.com/blog/effective-snapshot-testing)
