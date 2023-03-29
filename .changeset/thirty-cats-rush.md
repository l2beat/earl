---
"earl": minor
---

Replace jest-snapshots with a custom implementation.

Previously in order to use snapshots a test runner integration was needed. In
mocha this was done by adding `-r earl/mocha` to the command line and in uvu
`-r earl/uvu`. The jest snapshot code was also complex, had a lot of
dependencies and was hard to maintain.

This commit removes the jest snapshot code and replaces it with a custom
implementation of snapshots. Instead of requiring a custom module at the runner
level it instead asks the user to provide test context directly.

In mocha this is simply done by passing `this` inside a test (remember to use
`function` and not `=>`).

```js
it("should work", function () {
  expect(1).toMatchSnapshot(this);
});
```

In uvu this is done by passing the `ctx` which is an argument to te test
callback.

```js
test("should work", (ctx) => {
  expect(1).toMatchSnapshot(ctx);
});
```

The snapshot format has also been improved. Jest uses a js-like module format,
which is hard to read and requires executing code. The new version uses simple
text files which include formatted js entities, using the same formatting
functionality as the equality algorithm.
