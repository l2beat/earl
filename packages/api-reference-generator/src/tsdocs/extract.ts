import { assert } from 'ts-essentials'

import { MethodComment } from '../types'

export function extractTsDocCommentsFromString(source: string): MethodComment[] {
  const BLOCK_COMMENT_REGEX = /\/\*\*(.*?)\*\/\n(.*?)[{|\n]/gms

  const methodComments: MethodComment[] = []

  let rawMethodComment = BLOCK_COMMENT_REGEX.exec(source)
  assert(rawMethodComment, `Couldn't find any block comments in ${source}`)
  while (rawMethodComment != null) {
    const comment = `/** ${rawMethodComment[1].trim()} */`
    const signature = rawMethodComment[2].trim()

    methodComments.push({ signature, comment })

    rawMethodComment = BLOCK_COMMENT_REGEX.exec(source)
  }

  return methodComments
}
