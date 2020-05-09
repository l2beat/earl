import { Fs, RealFs } from './fs'
import { replaceCallInSource, toLiteral } from './sourceUtils'
import { getCallTrace as realGetCallTrace, GetCallTraceType } from './stackTrace'

export type AutofixType = (functionCall: string, newValue: any) => void

export function autofix(fs: Fs = RealFs, getCallTrace: GetCallTraceType = realGetCallTrace): AutofixType {
  return (functionCall: string, newValue: any) => {
    const callTrace = getCallTrace(3)
    const source = fs.readFile(callTrace.file)

    const newSource = replaceCallInSource({
      source,
      column: callTrace.column,
      line: callTrace.line,
      call: functionCall,
      newArg: toLiteral(newValue),
    })

    fs.writeFile(callTrace.file, newSource)
  }
}
