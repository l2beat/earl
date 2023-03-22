import { assert } from 'ts-essentials'

import { MethodComment } from '../types'

// @todo: this method could be simplified to only work when semicolon is present at the end of the signature
export function extractTsDocCommentsFromString(
  source: string,
): MethodComment[] {
  // @todo use TypeScript's parser to extract signatures and comments
  // We have a few bugs already — see skipped tests in extract.test.ts
  const DOC_COMMENT_REGEX = /\/\*\*([\s\S]*?)\*\/[\n\r]+([\s\S]*?)[{;\n\r]+/gm

  const methodComments: MethodComment[] = []

  let rawMethodComment = DOC_COMMENT_REGEX.exec(source)
  assert(
    rawMethodComment,
    `Couldn't find any block comments in source:\n\`${source}\``,
  )
  while (rawMethodComment != null) {
    const comment = `/** ${rawMethodComment[1]!.trim()} */`
    let signature = removeGetterKeyword(rawMethodComment[2]!.trim())

    if (signature.endsWith(';')) signature = signature.slice(0, -1)

    methodComments.push({ signature, comment })

    rawMethodComment = DOC_COMMENT_REGEX.exec(source)
  }

  return methodComments
}

function removeGetterKeyword(signature: string): string {
  if (signature.startsWith('get ')) {
    return signature.substring('get '.length)
  }
  return signature
}
