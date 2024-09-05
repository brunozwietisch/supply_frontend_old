import { isJsonString } from '@/core/utils/checkers'
import {
  Descendant,
  Editor,
  Element as SlateElement,
  Node,
  Transforms
} from 'slate'

export type MarkFormatType = 'bold' | 'italic' | 'underline' | 'code'
export type BlockFormatType =
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'left'
  | 'center'
  | 'right'
  | 'justify'

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const isMarkActive = (editor: Editor, format: MarkFormatType) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const isBlockActive = (
  editor: Editor,
  format: BlockFormatType,
  blockType: 'align' | 'type' = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore
        n[blockType] === format
    })
  )

  return !!match
}

export const toggleMark = (editor: Editor, format: MarkFormatType) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const toggleBlock = (editor: Editor, format: BlockFormatType) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true
  })

  let newProperties: any

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    }
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    // @ts-ignore
    Transforms.wrapNodes(editor, block)
  }
}

export const formatDescendantToPlainText = (value?: string) => {
  if (!value || !isJsonString(value)) return '-'

  const parsedValue: Descendant[] = JSON.parse(value)

  const serializeToPlainText = (nodes: Descendant[]) => {
    return nodes.map(n => Node.string(n)).join('\n')
  }

  return serializeToPlainText(parsedValue)
}

export const SlateText = (props: any) => {
  const { attributes, children, type } = props
  switch (type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      return (
        <a {...attributes} href={type.url}>
          {children}
        </a>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}
