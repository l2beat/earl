import { AssertTrue, IsExact } from 'conditional-type-checks'

import { __ExpectationImplementation } from '../../src/Expectation'
import { Mock } from '../../src/mocks/types'
import {
  ArrayValidators,
  CommonValidators,
  FunctionValidators,
  IterableValidators,
  MockValidators,
  NumberValidators,
  ObjectValidators,
  PromiseValidators,
  ValidatorsFor,
} from '../../src/validators/types'

type _NumberValidators = ValidatorsFor<number>
type _t1 = AssertTrue<IsExact<_NumberValidators, NumberValidators & CommonValidators<number>>>

type _ObjectValidators = ValidatorsFor<object>
type _t2 = AssertTrue<IsExact<_ObjectValidators, ObjectValidators & CommonValidators<object>>>

type _SetValidators = ValidatorsFor<Set<string>>
type _t2_1 = ObjectValidators & CommonValidators<Set<string>> & IterableValidators<string>

type _PromiseStringValidators = ValidatorsFor<Promise<string>>
type _t3 = AssertTrue<
  IsExact<_PromiseStringValidators, ObjectValidators & PromiseValidators & CommonValidators<Promise<string>>>
>

type _PromiseVoidValidators = ValidatorsFor<Promise<void>>
type _t4 = AssertTrue<
  IsExact<_PromiseVoidValidators, ObjectValidators & PromiseValidators & CommonValidators<Promise<void>>>
>

type _StringArrayValidators = ValidatorsFor<string[]>
type _t5 = AssertTrue<
  IsExact<
    _StringArrayValidators,
    ObjectValidators & ArrayValidators & IterableValidators<string> & CommonValidators<string[]>
  >
>

type _StringValidators = ValidatorsFor<string>
type _t6 = AssertTrue<IsExact<_StringValidators, IterableValidators<string> & CommonValidators<string>>>

type _BooleanOrNumberValidators = ValidatorsFor<boolean | number>
type _t7 = AssertTrue<IsExact<_BooleanOrNumberValidators, NumberValidators & CommonValidators<boolean | number>>>

type SyncOrAsyncNumbers = Promise<number[]> | number[]
type _SyncOrAsyncArrayValidators = ValidatorsFor<SyncOrAsyncNumbers>

type _t8 = AssertTrue<
  IsExact<
    _SyncOrAsyncArrayValidators,
    ObjectValidators &
      ArrayValidators &
      PromiseValidators &
      CommonValidators<SyncOrAsyncNumbers> &
      IterableValidators<number>
  >
>

type _MockValidators = ValidatorsFor<Mock.Of<(x: number) => string>>
type _t19 = AssertTrue<
  IsExact<
    _MockValidators,
    ObjectValidators &
      CommonValidators<Mock.Of<(x: number) => string>> &
      MockValidators<Mock.Of<(x: number) => string>> & {}
  >
>

type _AnyValidators = ValidatorsFor<any>
type _t10 = AssertTrue<
  IsExact<
    _AnyValidators,
    ObjectValidators &
      ArrayValidators &
      IterableValidators<any> &
      NumberValidators &
      PromiseValidators &
      FunctionValidators &
      CommonValidators<any> &
      MockValidators<any>
  >
>

type _UnknownValidators = ValidatorsFor<unknown>
type _t11 = AssertTrue<
  IsExact<
    _UnknownValidators,
    ObjectValidators &
      ArrayValidators &
      IterableValidators<unknown> &
      NumberValidators &
      PromiseValidators &
      FunctionValidators &
      CommonValidators<unknown> &
      MockValidators<unknown>
  >
>

type _NeverValidators = ValidatorsFor<never>
type _t12 = AssertTrue<IsExact<_NeverValidators, {}>>

type _ExpectationImplementationMustContainAllMethodsFromValidators = AssertTrue<
  __ExpectationImplementation<number> extends ValidatorsFor<any> ? true : false
>
