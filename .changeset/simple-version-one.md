---
"earl": major
---

Earl 1.0.0

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
