import { Control } from './common'

export async function toBeRejected(control: Control<Promise<any>>, expectedMsg?: string): Promise<void> {
  let error: any | undefined
  try {
    await control.actual
  } catch (e) {
    error = e
  }

  if (expectedMsg !== undefined) {
    control.assert({
      success: error?.message === expectedMsg,
      reason: `Expected to be rejected with "${expectedMsg}" but got "${error?.message}"`,
      negatedReason: `Expected not to be rejected with "${expectedMsg}" but did`,
    })
  } else {
    control.assert({
      success: !!error,
      reason: `Expected to be rejected but didn't`,
      negatedReason: `Expected not to be rejected but was rejected with ${error}`,
    })
  }
}
