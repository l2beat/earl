import { TSDocParser, ParserContext, DocNode, DocExcerpt } from '@microsoft/tsdoc'
import { readFileSync } from 'fs'
import { join } from 'path'
import { assert } from 'ts-essentials'

interface Param {
  name: string
  description: string
}

interface MethodDocumentation {
  signature: string
  description: string
  params: Param[]
  examples: string[]
}

export function parseComment(methodComment: MethodComment): MethodDocumentation {
  const tsdocParser: TSDocParser = new TSDocParser()

  const parserContext = tsdocParser.parseString(methodComment.comment)

  if (parserContext.log.messages.length > 0) {
    throw new Error('Syntax error: ' + parserContext.log.messages[0].text)
  }

  const docComment = parserContext.docComment

  const description = Formatter.renderDocNode(docComment.summarySection)

  const params: Param[] = []
  for (const param of docComment.params.blocks) {
    params.push({ name: param.parameterName, description: Formatter.renderDocNode(param.content).trim() })
  }

  const examples: string[] = []

  for (const customBlock of docComment.customBlocks) {
    if (customBlock.blockTag.tagName !== '@example') {
      continue
    }

    const contents = Formatter.renderDocNode(customBlock.content).trim()
    examples.push(contents)
  }

  return {
    signature: methodComment.signature,
    description,
    params,
    examples,
  }
}

export interface MethodComment {
  signature: string
  comment: string
}

export function extractTsDocCommentsFromString(source: string): MethodComment[] {
  const BLOCK_COMMENT_REGEX = /\/\*\*(.*?)\*\/\n(.*?)[\{|\n]/gms

  const methodComments: MethodComment[] = []

  let rawMethodComment = BLOCK_COMMENT_REGEX.exec(source)
  assert(rawMethodComment, `Couldn't find any block comments in ${source}`)
  while (rawMethodComment != null) {
    debugger
    const comment = `/** ${rawMethodComment[1].trim()} */`
    const signature = rawMethodComment[2].trim()

    methodComments.push({ signature, comment })

    rawMethodComment = BLOCK_COMMENT_REGEX.exec(source)
  }

  return methodComments
}

export class Formatter {
  public static renderDocNode(docNode: DocNode): string {
    let result: string = ''
    if (docNode) {
      if (docNode instanceof DocExcerpt) {
        result += docNode.content.toString()
      }
      for (const childNode of docNode.getChildNodes()) {
        result += Formatter.renderDocNode(childNode)
      }
    }
    return result
  }

  public static renderDocNodes(docNodes: ReadonlyArray<DocNode>): string {
    let result: string = ''
    for (const docNode of docNodes) {
      result += Formatter.renderDocNode(docNode)
    }
    return result
  }
}
