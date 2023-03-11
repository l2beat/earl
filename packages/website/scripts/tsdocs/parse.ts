import { DocExcerpt, DocNode, TSDocParser } from '@microsoft/tsdoc'
import { assert } from 'ts-essentials'
import { Node, Project as TSProject } from 'ts-morph'

import { MethodComment, MethodDocumentation, Param } from '../types'

export function parseTsDocComment(methodComment: MethodComment): MethodDocumentation {
  const tsdocParser: TSDocParser = new TSDocParser()
  const tsProject = new TSProject({ useInMemoryFileSystem: true })

  const parserContext = tsdocParser.parseString(replaceTrailingSlashNewlines(methodComment.comment))

  if (parserContext.log.messages.length > 0) {
    throw new Error(
      `Syntax error: \n ${parserContext.log.messages[0].text}\nwhile parsing: \n${methodComment.comment}\n${methodComment.signature}`,
    )
  }

  const docComment = parserContext.docComment

  let description = renderDocNode(docComment.summarySection).trimRight()

  // DocNodes render description as a list item, but we just want a paragraph
  if (description.startsWith('* ')) description = description.slice(2)

  const params: Param[] = []
  for (const param of docComment.params.blocks) {
    const name = param.parameterName
    const description = renderDocNode(param.content).trim()

    // enforce common formatting for param descriptions
    if (!description.endsWith('.')) {
      throw new Error(`Param description for "${name}" of "${methodComment.signature}" doesn't end with a dot (".")!`)
    }

    // (best effort) enforce that param names are consistent with function signatures
    if (!methodComment.signature.includes(name)) {
      throw new Error(`Param "${name}" is not part of signature "${methodComment.signature}"!`)
    }

    params.push({ name, description })
  }

  const examples: string[] = []

  for (const customBlock of docComment.customBlocks) {
    if (customBlock.blockTag.tagName !== '@example') {
      continue
    }

    // Examples are rendered as Markdown as they are, without any post-processing.
    // Make sure to mark all code snippets with language identifer (e.g. ```ts)
    const contents = renderDocNode(customBlock.content).trim()

    examples.push(contents)
  }

  const signature = removeExportDeclareKeywords(methodComment.signature)
  const abbreviatedSignature = abbreviateSignature(signature, tsProject)

  return {
    signature,
    abbreviatedSignature,
    description,
    params,
    examples,
  }
}

function renderDocNode(docNode: DocNode): string {
  let result = ''

  if (docNode instanceof DocExcerpt) {
    result += docNode.content.toString()
  }
  for (const childNode of docNode.getChildNodes()) {
    result += renderDocNode(childNode)
  }

  return result
}

function abbreviateSignature(signature: string, project: TSProject): string {
  const isClassMethod = !signature.includes('function ')
  const sourceCode = isClassMethod ? `function ${signature} {}` : signature

  const sourceFile = project.createSourceFile('temp.ts', sourceCode, {
    overwrite: true,
  })
  const functionDeclaration = sourceFile.getChildAtIndex(0).getChildAtIndex(0)
  assert(Node.isFunctionDeclaration(functionDeclaration))

  if (signature.includes('this:')) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

/**
 * Trailing `\` causes tsdoc parser to fail with
 * > A backslash can only be used to escape a punctuation character
 *
 * We replace ` \` at the ends of lines in the comment with 2 spaces which
 * also represent a line break in markdown.
 *
 * @see https://gist.github.com/shaunlebron/746476e6e7a4d698b373
 */
function replaceTrailingSlashNewlines(text: string) {
  return text
    .split('\n')
    .map((line) => line.replace(/ \\\r?$/, '  '))
    .join('\n')
}
