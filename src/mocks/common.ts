import { LooseMock } from './looseMock'
import { StrictMock } from './strictMock'

export type Mock = StrictMock<any, any> | LooseMock<any, any>
