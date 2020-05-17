import debug from 'debug'

import { Fs, RealFs } from './fs'
import { shouldPreventAutofix } from './predicates'
import { AutofixError, NoCallSiteError, OutOfFileError, replaceCallInSource, toLiteral } from './sourceUtils'
import { getCallTrace as realGetCallTrace, GetCallTraceType } from './stackTrace'

const d = debug('earl:autofix')

export type AutofixType = (functionCall: string, newValue: any) => void

export function autofix(
  fs: Fs = RealFs,
  getCallTrace: GetCallTraceType = realGetCallTrace,
  shouldPreventRunning: () => boolean = shouldPreventAutofix(),
): AutofixType {
  return (functionCall: string, newValue: any) => {
    if (shouldPreventRunning()) {
      console.log(`Autofixing prevented!`)
      throw new Error('Prevented autofix')
    }
    console.log(`Autofixing ${functionCall}...`)
    d(`Autofixing: `, functionCall, newValue)

    const callTrace = getCallTrace(4) // @todo: rewrite this to something smarter
    d(`Fixing file ${callTrace.file} ${callTrace.line}:${callTrace.column}`)
    try {
      const source = fs.readFile(callTrace.file)

      const newSource = replaceCallInSource({
        source,
        column: callTrace.column,
        line: callTrace.line,
        call: functionCall,
        newArg: toLiteral(newValue),
      })

      fs.writeFile(callTrace.file, newSource)
    } catch (e) {
      if (e instanceof OutOfFileError) {
        throw new AutofixError(`Couldn't find ${callTrace.file}:${callTrace.line}:${callTrace.column}`)
      }
      if (e instanceof NoCallSiteError) {
        throw new AutofixError(
          `Couldn't find a call ${functionCall} in ${callTrace.file}:${callTrace.column}:${callTrace.line}`,
        )
      }
      throw new AutofixError(e.message)
    }
  }
}
