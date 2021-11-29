// @ts-check
const visit = require('unist-util-visit')
const tsMorph = require('ts-morph')
const { assert } = require('ts-essentials')

const tsProject = new tsMorph.Project({ useInMemoryFileSystem: true })

const plugin = (options) => {
  /**
   * All heading of shape #### **`someCode`** are transformed.
   * @param {import("unist").Node} ast
   */
  const transformer = async (ast) => {
    visit(ast, 'heading', (node) => {
      if (node.depth === 4 && Array.isArray(node.children) && node.children[0].type === 'strong') {
        const strong = node.children[0]
        const inlineCode = strong.children[0]
        if (inlineCode.type === 'inlineCode') {
          const highlighted = signatureHeadingHighlighter(inlineCode.value) // sillySignatureHighlighter(inlineCode.value)

          if (!highlighted) return

          strong.type = 'html'
          strong.value = highlighted
          strong.children = undefined
        }
      }
    })
  }
  return transformer
}

module.exports = plugin

/**
 * @param {string} signature
 */
function signatureHeadingHighlighter(signature) {
  if (!signature.includes('\n') && signature.match(/[()]/)) {
    const isClassMethod = !signature.includes('function ')
    const sourceCode = isClassMethod ? `function ${signature} {}` : signature

    const sourceFile = tsProject.createSourceFile('temp.ts', sourceCode, { overwrite: true })
    const statement = sourceFile.getStructure().statements[0]
    if (tsMorph.Structure.isFunction(statement)) {
      return `
        <code>
          ${statement.isExported ? 'export ' : ''}
          ${statement.isAsync ? 'async ' : ''}
          ${span(statement.name, 'functionName')}
          ${
            statement.typeParameters && statement.typeParameters.length
              ? punctuation('<') +
                statement.typeParameters
                  .map((t) => {
                    let res = ''
                    if (typeof t === 'string') {
                      res = t
                    } else {
                      res = t.name + (t.constraint ? ` extends ${t.constraint}` : '')
                    }
                    return span(res, 'typeParameter')
                  })
                  .join(punctuation(', ')) +
                punctuation('>')
              : ''
          }
          ${
            punctuation('(') +
            statement.parameters
              .map(
                (param) =>
                  span(param.name, 'paramName') +
                  punctuation(`${param.hasQuestionToken ? '?' : ''}: `) +
                  // `<span class="paramType">${escapeHtml(param.type.toString())}</span>`
                  span(param.type.toString(), 'paramType'),
              )
              .join(', ') +
            punctuation(')')
          }
          ${
            statement.returnType
              ? punctuation(': ') + `<span class="returnType">${escapeHtml(statement.returnType.toString())}</span>`
              : ''
          }
        </code>
      `.replace(/\s\s+/g, '')
    }
  } else {
    const [name, typeAnnotation] = signature.split(': ')
    return `<code>${
      span(name, 'valueName') + (typeAnnotation ? punctuation(': ') + span(typeAnnotation, 'typeAnnotation') : '')
    }</code>`
  }

  // This is not a function signature, so we do not highlight it.
  return null
}

/**
 * @param {string} str
 */
function punctuation(str) {
  return span(str, 'punctuation')
}

/**
 *
 * @param {string} child
 * @param {string} className
 */
function span(child, className) {
  return `<span class="${className}">${escapeHtml(child)}</span>`
}

signatureHeadingHighlighter('calls: MockCall<TArgs, TReturn>[]') //?

/**
 * @param {string} str
 */
function escapeHtml(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag),
  )
}
