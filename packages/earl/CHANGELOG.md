# earl

## 1.0.1

### Patch Changes

- 2886d70: Fix esm exports

## 1.0.0

### Major Changes

- 54b295f: Earl 1.0.0

  This is the first stable release of Earl. It is an almost complete rewrite of the original Earl. The new version is much simpler, more powerful and easier to use.

  **Changes from the previous version**

  1. The package name has changed from `earljs` to `earl`. The old package name will be deprecated on npm.

     - The new release includes both CommonJS and ESM builds.

  2. Website updates

     - The website domain name has changed from `https://earljs.dev` to `https://earl.fun`.

     - The old domain will keep redirecting to the new one for a while.

     - The documentation has been updated to include new guides, more examples.

     - The documentation engine changed from Docusaurus to Vitepress.

  3. Snapshot testing no longer relies on `jest-snapshot`.

     - We developed a custom implementation which is much simpler and easier to maintain.

     - Snapshots are now saved alongside test files inside `.snapshot` files.

     - The `toMatchSnapshot` validator now requires a test context to be passed to it. This is done by passing `this` in mocha and `ctx` in uvu.

     - Test runner integration namely `earljs/mocha` and `earljs/uvu` are no longer needed and have been removed.

  4. Extending Earl with custom matchers and validators is now much easier. Instead of a special plugin system, custom matchers and validators are defined in the same way as the built in ones.

     - Adding validators is now done using `registerValidator` and declaring module overrides to make types work.

     - Adding matchers is now done using `registerMatcher` and declaring module overrides to make types work.

     - The ability to add custom equality rules was removed and there are no plans to bring it back in the future.

     - A special export `earljs/internal` is no longer needed and has been removed.

  5. Validator API changes

     - The `expect()` function now only takes a single argument, which is the value to be tested. No custom options can be passed to it.

     - `toBeAContainerWith` has been replaced by `toInclude`.

     - `toBeAnArrayOfLength` has been replaced by `toHaveLength`.

     - `toBeAnArrayWith` has been replaced by `toInclude`.

     - `toBeAnObjectWith` has been removed. We are planning to add a new `toHaveSubset` validator in the near future.

     - `toBeDefined` was removed. It was unintuitive that it checked both `null` and `undefined`. Instead you should now call `expect(value).not.toBeNullish()`.

     - `toBeExhausted` has replaced by `toHaveBeenExhausted`.

     - `toBeGreaterThan` now works with numbers and bigints.

     - `toBeGreaterThanOrEqualTo` has been replaced by `toBeGreaterThanOrEqual` and now works with numbers and bigints.

     - `toBeLessThan` now works with numbers and bigints.

     - `toBeLessThanOrEqualTo` has been replaced by `toBeLessThanOrEqual` and now works with numbers and bigints.

     - `toBeRejected` doesn't take arguments anymore. Instead you should use `toBeRejectedWith` to check the error.

     - `toEqual` no longer has type checking problems with recursive types.

     - `toHaveBeenCalledExactlyWith` has been removed. It was a very ugly API. It has been replaced by a suite of new mock validators.

     - `toMatchSnapshot` now requires a test context to be passed to it. This is done by passing `this` in mocha and `ctx` in uvu.

     - `toReferentiallyEqual` has been replaced by `toExactlyEqual`.

     - `toThrow` now always fails if the function returns a promise.

  6. Matcher API changes

     - All matchers now return `never` instead of trying to imitate the type of the value they are matching. This behavior is going to stay until TypeScript introduces a better way to do this.

     - `arrayOfLength` has been replaced by `length`.

     - `arrayWith` has been replaced by `includes`.

     - `containerWith` has been replaced by `includes`.

     - `defined` now checks for only `undefined`. Previously it checked for both `null` and `undefined`. Instead you should now call `notNullish`.

     - `numberCloseTo` has been replaced by `closeTo`. The second parameter is now just the delta and not an object with the `delta` property.

     - `numberGreaterThan` has been replaced by `greaterThan` and now works with numbers and bigints.

     - `numberGreaterThanOrEqualTo` has been replaced by `greaterThanOrEqual` and now works with numbers and bigints.

     - `numberLessThan` has been replaced by `lessThan` and now works with numbers and bigints.

     - `numberLessThanOrEqualTo` has been replaced by `lessThanOrEqual` and now works with numbers and bigints.

     - `objectWith` has been replaced by `subset`.

     - `stringMatching` has been replaced by `includes` and `regex`.

  7. Mock API changes

     - Fix types for mocks. Previously, the types for `.executes` and `.executesOnce` were incorrect.

     - Rename `Mock` to `MockFunction`.

     - Rename `MockOf` to `MockFunctionOf`.

     - Calling configuration functions that change the default mock behavior no longer resets the mock. An explicit `reset` function has been added for that purpose.

  **New features**

  1. New validators

     - `toBeAnInteger`.

     - `toBeASafeInteger`.

     - `toBeBetween`.

     - `toBeCloseTo`.

     - `toBeEmpty`.

     - `toEqualUnsorted`.

     - `toHaveBeenCalled`.

     - `toHaveBeenCalledTimes`.

     - `toHaveBeenLastCalledWith`.

     - `toHaveBeenNthCalledWith`.

     - `toHaveBeenOnlyCalledWith`.

     - `toMatchRegex`.

     - `toMatchSchema`.

     - `toSatisfy`.

  2. New matchers

     - `between`.

     - `closeTo`.

     - `empty`.

     - `integer`.

     - `notEmpty`.

     - `notNullish`.

     - `property`.

     - `regex`.

     - `safeInteger`.

     - `satisfies`.

     - `schema`.

     - `subset`.

  3. New mock capabilities

     - Added `mockObject` that can be used to mock objects.

## 0.2.3

### Patch Changes

- 1887ac2: Snapshot tests in `uvu` are now supported with `earljs/uvu`.

  To use Earl with `uvu`, require `earljs/uvu` in your test command:

  ```sh
  # using the uvu cli
  $ uvu -r earljs/uvu tests

  # using node directly
  $ node -r earljs/uvu tests/example.test.js
  ```

## 0.2.2

### Patch Changes

- fde9d67: Fixed "a" matcher for functions

## 0.2.1

### Patch Changes

- 7378e50: Earl formatting no longer crashes on object with constructor set to undefined.

## 0.2.0

### Minor Changes

- 7dca1a2: Assertion errors throw with clean (without internal entries) stack traces
- 3973df6: Redo equality algorithm, improve error diffs

### Patch Changes

- 489321e: Add new validators and matchers: `toBeTruthy`, `toBeFalsy`, `toBeDefined`, `toBeNullish`
- 05013cd: Make `toBeAnArrayWith` and `toBeAContainerWith` handle repeated items as expected
- 489321e: Allow to override `toEqual` types via plugins

## 0.1.12

### Patch Changes

- afbd34b: Ensure that package is published with the readme. Readme updates.

## 0.1.11

### Patch Changes

- d69576f: Fix types for mockFn's default implementation
- 00cae63: Function mocks can now be typed as Mock.Of<TFunctionType>
- a0f7b98: Improve support for comparing recursive objects
- 3651e17: Earl no longer crashes in mocha --watch mode
- d02b7d6: process.env.UPDATE_SNAPSHOTS set to "1" is now treated the same as when set to "true"

## 0.1.10

### Patch Changes

- f37f7fa: Improve types for `rejectsWithOnce` and ensure that no unhandled rejection error can be thrown.
- f37f7fa: Make `objectWith` work with all kinds of objects, not only with plain objects. This is a breaking change.

## 0.1.9

### Patch Changes

- c4c75c8: `Control.assert` type changed from never to void.
- ceb7d92: Added new validators:

  - `toBeA`
  - `toBeAContainerWith`
  - `toBeAnArrayOfLength`
  - `toBeAnArrayWith`
  - `toBeAnObjectWith`

  Added new matchers:

  - `expect.arrayOfLength`

- 3335eca: Stop exporting `loadMatchers` from the main entry point.
- d99dcee: Add new number validators:
  - `toBeGreaterThanOrEqualTo(number)`
  - `toBeLessThan(number)`
  - `toBeLessThanOrEqualTo(number)`
  - `toBeExhausted(number)`
- 3335eca: Replace `Partial<PluginConfig>` instances with the equivalent `PluginConfig`.
- c4c75c8: Added `Control.fail`.
- 3335eca: Improve doc comments and function parameter names for the public library exports.

## 0.1.8

### Patch Changes

- 69c6af3: Add `toReferentiallyEqual` validator performing referential equality
- 3f2ebc2: Improve `ErrorMatcher` description in error strings
- 3f2ebc2: [Plugin devs] Make `control.assert` return `never` not `void`.

## 0.1.7

### Patch Changes

- 1ef1ad2: Adds the getControl function which is intended to be used by plugins.

## 0.1.6

### Patch Changes

- 125c29b: Tweak `toHaveBeenCalledExactlyWith` input type to properly support arrays
- 923847b: Made `expect.a(Array)` return type be `any[]` not `unknown[]` which works well with `toEqual`.

## 0.1.5

### Patch Changes

- 1eac490: Add `toMatchSnapshot` validator

## 0.1.4

### Patch Changes

- 591dccc: Add readme to the final npm package

## 0.1.3

### Patch Changes

- 4964a16: Migrated to monorepo.
- 4964a16: Fix bug in `StringMatching` matcher that prevented it from matching strings with special characters
- 1e3951d: Added new matchers: `arrayWith`, `objectWith` Improve `containerWith` to work with multiple values
- 4964a16: Added experimental plugin API.

## 0.1.2

### Patch Changes

- 0f490bd: Tweak `toBeRejected` validator signature to be properly async (return `Promise<void>`). This was a bug in
  typings not in behaviour.

## 0.1.1

### Patch Changes

- d2efbc6: Change compilation target to ES2015 to enable running on older node.js versions
- 42ed317: Added `containerWith` matcher, allowing to match a iterable containing given value
