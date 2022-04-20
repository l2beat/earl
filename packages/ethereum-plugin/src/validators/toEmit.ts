import { Control, getControl, isEqual } from 'earljs/internals'
import { BaseContract, EventFilter, providers } from 'ethers'
import { LogDescription } from 'ethers/lib/utils'

// #region this could be exported from "@typechain/ethers"
export interface TypedEvent<TArgsArray extends Array<any> = any, TArgsObject = any> extends Event {
  args: TArgsArray & TArgsObject
}

export interface TypedEventFilter<_TEvent extends TypedEvent> extends EventFilter {}
// #endregion

type EventNames<TContract extends BaseContract> = keyof TContract['filters']
type EventArgs<TContract extends BaseContract, TEventName extends EventNames<TContract>> = ReturnType<
  TContract['filters'][TEventName]
> extends TypedEventFilter<infer T>
  ? [T, T['args']]
  : never

type StringKeys<T extends object> = { [P in keyof T as P extends `${number}` | number ? never : P]: T[P] }

type NumberKeys<T extends any[]> = { [I in keyof T as I extends `${number}` ? I : never]: T[I] }

// prettier-ignore
type NumberDictAsTuple<T extends Record<number, unknown>> = 
  unknown extends T[1] ? T[0] :
  unknown extends T[2] ? [T[0], T[1]] :
  unknown extends T[3] ? [T[0], T[1], T[2]] :
  unknown extends T[4] ? [T[0], T[1], T[2], T[3]] :
  unknown extends T[5] ? [T[0], T[1], T[2], T[3], T[4]] :
  unknown extends T[6] ? [T[0], T[1], T[2], T[3], T[4], T[5]] :
  unknown extends T[7] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6]] :
  unknown extends T[8] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]] :
  unknown extends T[9] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]] :
  [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]]

type EventArgsObject<TContract extends BaseContract, TEventName extends EventNames<TContract>> = StringKeys<
  Omit<EventArgs<TContract, TEventName>, keyof unknown[]>
>

type EventArgsArray<TContract extends BaseContract, TEventName extends EventNames<TContract>> = NumberDictAsTuple<
  NumberKeys<EventArgs<TContract, TEventName>>
>

export async function toEmit<TContract extends BaseContract, TEventName extends EventNames<TContract>>(
  this: any,
  contract: TContract,
  event: TEventName,
  args?: { EventFilter: ReturnType<TContract['filters'][TEventName]> },
): Promise<void> {
  const ctrl = getControl(this) as Control<
    | providers.TransactionResponse
    | providers.TransactionReceipt
    | Promise<providers.TransactionResponse | providers.TransactionReceipt>
  >

  let hasEvent = false
  try {
    contract.interface.getEvent(event.toString())
    hasEvent = true
  } catch {}
  if (!hasEvent) {
    const message =
      `Event ${event} does not exist on the provided contract!\n` + 'Make sure you have compiled the latest version.'
    ctrl.assert({
      success: ctrl.isNegated,
      reason: message,
      negatedReason: message,
    })
  }

  const tx = await Promise.resolve(ctrl.actual)
  const receipt = isResponse(tx) ? await tx.wait() : tx

  const events: LogDescription[] = []
  for (const log of receipt.logs) {
    if (log.address === contract.address) {
      try {
        events.push(contract.interface.parseLog(log))
      } catch {}
    }
  }

  if (!args) {
    ctrl.assert({
      success: events.some((x) => x.name === event),
      reason: `Event ${event} was not emitted by the provided contract.`,
      negatedReason: `Event ${event} was emitted by the provided contract.`,
    })
  } else {
    const relevant = events.filter((x) => x.name === event).map((x) => [...x.args])
    const success = relevant.some((x) => isEqual(x, args))
    ctrl.assert({
      success: success,
      reason: `Event ${event} was not emitted by the provided contract TODO: ARGS.`,
      negatedReason: `Event ${event} was emitted by the provided contract TODO: ARGS.`,
    })
  }
}

function isResponse(
  value: providers.TransactionResponse | providers.TransactionReceipt,
): value is providers.TransactionResponse {
  return 'wait' in value
}
