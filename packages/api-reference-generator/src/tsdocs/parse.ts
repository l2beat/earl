import { DocExcerpt, DocNode, TSDocParser } from '@microsoft/tsdoc'
import { assert } from 'ts-essentials'
import { Node, Project as TSProject } from 'ts-morph'

import { MethodComment, MethodDocumentation, Param } from '../types'

export function parseTsDocComment(methodComment: MethodComment): MethodDocumentation {
  const tsdocParser: TSDocParser = new TSDocParser()
  const tsProject = new TSProject({ useInMemoryFileSystem: true })

  const parserContext = tsdocParser.parseString(methodComment.comment)

  if (parserContext.log.messages.length > 0) {
    throw new Error(
      `Syntax error: \n ${parserContext.log.messages[0].text}\nwhile parsing: \n${methodComment.comment}\n${methodComment.signature}`,
    )
  }

  // @todo throw error:
  // when param has dot at the end
  // name is not consistent with signature
  const docComment = parserContext.docComment

  let description = Formatter.renderDocNode(docComment.summarySection).trimRight()

  // DocNodes render description as a list item, but we just want a paragraph
  if (description.startsWith('* ')) description = description.slice(2)

  const params: Param[] = []
  for (const param of docComment.params.blocks) {
    params.push({ name: param.parameterName, description: Formatter.renderDocNode(param.content).trim() })
  }

  const examples: string[] = []

  for (const customBlock of docComment.customBlocks) {
    if (customBlock.blockTag.tagName !== '@example') {
      continue
    }

    // Examples are rendered as Markdown as they are, without any post-processing.
    // Make sure to mark all code snippets with language identifer (e.g. ```ts)
    const contents = Formatter.renderDocNode(customBlock.content).trim()

    examples.push(contents)
  }

  const signature = removeExportDeclareKeywords(methodComment.signature)

  return {
    signature,
    abbreviatedSignature: abbreviateSignature(signature, tsProject),
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

function abbreviateSignature(signature: string, project: TSProject): string {
  const isClassMethod = !signature.includes('function ')
  const sourceCode = isClassMethod ? `function ${signature} {}` : signature

  const sourceFile = project.createSourceFile('temp.ts', sourceCode, { overwrite: true })
  const functionDeclaration = sourceFile.getChildAtIndex(0).getChildAtIndex(0)
  assert(Node.isFunctionDeclaration(functionDeclaration))

  if (signature.includes('this:')) {
    functionDeclaration.getParameter('this')!.remove()
  }

  functionDeclaration.removeReturnType()

  let text = functionDeclaration.getText()

  if (isClassMethod) {
    text = text.slice('function '.length, -' {}'.length)
  }

  return text
}

function removeExportDeclareKeywords(s: string) {
  return s.startsWith('export declare ') ? s.slice('export declare '.length) : s
}
