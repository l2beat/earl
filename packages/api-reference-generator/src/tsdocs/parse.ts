import { DocExcerpt, DocNode, TSDocParser } from '@microsoft/tsdoc'
import { assert } from 'ts-essentials'
import { Node, Project as TSProject } from 'ts-morph'

import { MethodComment, MethodDocumentation, Param } from '../types'

export function parseTsDocComment(methodComment: MethodComment): MethodDocumentation {
  const tsdocParser: TSDocParser = new TSDocParser()
  const tsProject = new TSProject()

  const parserContext = tsdocParser.parseString(methodComment.comment)

  if (parserContext.log.messages.length > 0) {
    throw new Error(
      `Syntax error: \n ${parserContext.log.messages[0].text}\nwhile parsing: \n${methodComment.signature}`,
    )
  }

  // TODO: throw error:
  // when param has dot at the end
  // name is not consistent with signature

  const docComment = parserContext.docComment

  const description = Formatter.renderDocNode(docComment.summarySection).trimRight()

  const params: Param[] = []
  for (const param of docComment.params.blocks) {
    params.push({ name: param.parameterName, description: Formatter.renderDocNode(param.content).trim() })
  }

  const examples: string[] = []

  for (const customBlock of docComment.customBlocks) {
    if (customBlock.blockTag.tagName !== '@example') {
      continue
    }

    let contents = Formatter.renderDocNode(customBlock.content).trim()

    // @todo We're assuming all code snippets are TypeScript.
    // This is the case for Earl, but it should probably be configurable.
    contents = contents.replace('```', '```ts')

    examples.push(contents)
  }

  return {
    signature: methodComment.signature,
    abbreviatedSignature: ignoreThisType(methodComment.signature, tsProject),
    description,
    params,
    examples,
  }
}

class Formatter {
  public static renderDocNode(docNode: DocNode): string {
    let result: string = ''

    if (docNode instanceof DocExcerpt) {
      result += docNode.content.toString()
    }
    for (const childNode of docNode.getChildNodes()) {
      result += Formatter.renderDocNode(childNode)
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

function ignoreThisType(signature: string, project: TSProject): string {
  if (!signature.includes('this:')) return signature

  const sourceFile = project.createSourceFile('temp.ts', `function ${signature} {}`, { overwrite: true })
  const functionDeclaration = sourceFile.getChildAtIndex(0).getChildAtIndex(0)

  assert(Node.isFunctionDeclaration(functionDeclaration))
  functionDeclaration.getParameter('this')!.remove()

  return functionDeclaration.getText().slice('function '.length, -' {}'.length)
}
