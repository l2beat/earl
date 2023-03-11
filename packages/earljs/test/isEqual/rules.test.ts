/* eslint-disable @typescript-eslint/no-redeclare */
import { AssertFalse, AssertTrue, Has, IsExact } from 'conditional-type-checks'

import { ExpectedEqual } from '../../src/isEqual/rules'
import { createPlugin, SmartEqRule } from '../../src/plugins'

// #region type-level tests

type _ActualTypes = [
  ExpectedEqual<number>,
  ExpectedEqual<string>,
  ExpectedEqual<undefined>,
  ExpectedEqual<1 | 2 | 3>,
  ExpectedEqual<Fruit>,
  ExpectedEqual<Banana>,
]
type _ExpectedTypes = [number, string, undefined, 1 | 2 | 3, Fruit, Banana]
type _EveryTypeCanBeEqualToItself = AssertTrue<
  IsExact<_ActualTypes, _ExpectedTypes>
>

interface TestPlugin {
  smartEqRules: {
    applesToOranges: SmartEqRule<Apple | Orange, Apple | Orange>
    potatoToFruit: SmartEqRule<Potato, Fruit>
    ruleThatCouldPossiblyBreakEverything: SmartEqRule<any, any>
    anotherNastyRule: SmartEqRule<unknown, unknown>
  }
}

type TestPluginRules = createPlugin.SmartEqRulesOf<TestPlugin>

type _NastyRulesAreFilteredOut = AssertTrue<
  IsExact<keyof TestPluginRules, 'applesToOranges' | 'potatoToFruit'>
>

declare module '../../src/isEqual/rules' {
  export interface SmartEqRules extends TestPluginRules {}
}

type _ApplesCanBeComparedToOranges = AssertTrue<
  IsExact<ExpectedEqual<Apple>, Apple | Orange>
>
type _OrangesCanBeComparedToApples = AssertTrue<
  IsExact<ExpectedEqual<Orange>, Apple | Orange>
>

type _PotatoCanBeComparedWithFruit = AssertTrue<
  IsExact<ExpectedEqual<Potato>, Potato | Fruit>
>
type _ButAFruitCannotBeComparedWithPotato = AssertFalse<
  Has<ExpectedEqual<Fruit>, Potato>
>

class Apple {
  // private property forces nominal typing
  #brand!: never
}
class Banana {
  #brand!: never
}
class Orange {
  #brand!: never
}
class Potato {
  #brand!: never
}

type Fruit = Apple | Banana | Orange

// #endregion type-level tests
